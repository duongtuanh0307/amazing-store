import { useContext, useEffect, useState } from "react";
import router from "next/router";
import dynamic from "next/dynamic";
import { Store } from "../components/Store";
import {
  CustomerInfoType,
  ShippingInfoType,
  PaymentInfoType,
} from "../types/Customer";
import {
  defaultCustomer,
  defaultShippingInfo,
  defaultPaymentInfo,
} from "../utils/constants";
import { resetIdCounter, Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { CustomerInfo } from "../components/checkout/CustomerInfo";
import { ShippingInfo } from "../components/checkout/ShippingInfo";
import { PaymentInfo } from "../components/checkout/PaymentInfo";
import { ActionButtons } from "../components/checkout/ActionButtons";
import CheckIcon from "../components/icons/CheckIcon";
import getCommerce from "../utils/commerce";
import { ShoppingCartTable } from "../components/ShoppingCartTable";
import { CartItem } from "../types/Cart";

const FORM_LABELS = [
  "Customer Infomation",
  "Shipping Infomation",
  "Payment Infomation",
];

resetIdCounter();

const Checkout = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfoType>(defaultCustomer);
  const [shippingInfo, setShippingInfo] =
    useState<ShippingInfoType>(defaultShippingInfo);
  const [paymentInfo, setPaymentInfo] =
    useState<PaymentInfoType>(defaultPaymentInfo); //payment info for test: card-num: 4242 4242 4242 4242; cvv: 123; postal/zip code: 90089
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState([]);
  const [checkoutToken, setCheckoutToken] = useState<any>();

  useEffect(() => {
    if (!cart.loading) {
      generateCheckoutToken();
    }
  }, [cart.loading]);

  const generateCheckoutToken = async () => {
    if (cart.data?.line_items.length) {
      const commerce = getCommerce();
      const token = await commerce.checkout.generateToken(cart.data?.id, {
        type: "cart",
      });
      setCheckoutToken(token);
    } else {
      router.push("/cart");
    }
  };

  const refreshCart = async () => {
    const commerce = getCommerce();
    const newCart = await commerce.cart.refresh();
    dispatch({ type: "CART_RETRIEVE_SUCCESS", payload: newCart });
  };

  const handleGoBack = () => {
    setActiveStep(activeStep - 1);
    if (activeStep === FORM_LABELS.length - 1) setErrors([]);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleConfirmOrder = async () => {
    const lineItems =
      checkoutToken.live.line_items.length <= 0
        ? {}
        : checkoutToken.live.line_items.reduce(
            (obj: Object, item: CartItem) =>
              Object.assign(obj, {
                [item.id]: {
                  ...item,
                },
              }),
            {}
          );
    const orderData = {
      line_items: lineItems,
      customer: {
        firstname: customerInfo.firstName,
        lastname: customerInfo.lastName,
        email: customerInfo.email,
      },
      shipping: {
        name: shippingInfo.receiver,
        street: shippingInfo.street,
        town_city: shippingInfo.city,
        county_state: shippingInfo.province,
        postal_zip_code: shippingInfo.postalZipCode,
        country: shippingInfo.country,
      },
      fulfillment: {
        shipping_method: shippingInfo.shippingOption,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: paymentInfo.cardNum,
          expiry_month: paymentInfo.expMonth,
          expiry_year: paymentInfo.expYear,
          cvc: paymentInfo.cvv,
          postal_zip_code: paymentInfo.billingPostalZipcode,
        },
      },
    };
    const commerce = getCommerce();
    try {
      const order = await commerce.checkout.capture(
        checkoutToken?.id,
        orderData
      );
      dispatch({ type: "ORDER_SET", payload: order });
      localStorage.setItem("order_receipt", JSON.stringify(order));
      await refreshCart();
      router.push("/confirmation");
    } catch (err) {
      const errList = [err.data.error.message];
      const errs = err.data.error.errors;
      for (const index in errs) {
        errList.push(`${errs[index]}`);
      }
      setErrors(errList);
    }
  };

  const handleChangeCustomerInfo = (
    key: keyof CustomerInfoType,
    value: string
  ) => {
    setCustomerInfo({ ...customerInfo, [key]: value });
  };

  const handleChangeShippingInfo = (
    key: keyof ShippingInfoType,
    value: string
  ) => {
    setShippingInfo({ ...shippingInfo, [key]: value });
  };

  const handleChangePaymentInfo = (
    key: keyof PaymentInfoType,
    value: string
  ) => {
    setPaymentInfo({ ...paymentInfo, [key]: value });
  };

  return (
    <div className='flex flex-col-reverse w-full justify-center lg:items-start lg:flex-row px-8'>
      <div className='p-4 border border-gray-200 rounded mb-8 bg-white'>
        <h3 className='font-bold text-2xl flex justify-center mb-8'>
          Checkout
        </h3>
        <Tabs
          selectedIndex={activeStep}
          onSelect={(nextIndex: number) => setActiveStep(nextIndex)}
        >
          <TabList className='flex'>
            {FORM_LABELS.map((formLabel, index) => {
              const finishedStep = index < activeStep;
              return (
                <Tab key={index} className='flex flex-col items-center px-4'>
                  <p className='flex justify-center w-8 h-8 rounded-full bg-blue-900 p-1 font-bold text-white'>
                    {finishedStep ? <CheckIcon /> : index + 1}
                  </p>
                  <span className='text-sm font-semibold uppercase mt-2'>
                    {formLabel}
                  </span>
                </Tab>
              );
            })}
          </TabList>
          <p className='text-red-500 text-xs font-semibold px-4 pt-4'>
            * All fields are required
          </p>
          <TabPanel>
            <CustomerInfo
              customerInfo={customerInfo}
              handleChangeCustomerInfo={handleChangeCustomerInfo}
            />
          </TabPanel>
          <TabPanel>
            <ShippingInfo
              shippingInfo={shippingInfo}
              handleChangeShippingInfo={handleChangeShippingInfo}
              checkoutTokenId={checkoutToken?.id}
            />
          </TabPanel>
          <TabPanel>
            <PaymentInfo
              paymentInfo={paymentInfo}
              handleChangePaymentInfo={handleChangePaymentInfo}
            />
          </TabPanel>
        </Tabs>
        <ActionButtons
          isFirstStep={activeStep === 0}
          isLastStep={activeStep === FORM_LABELS.length - 1}
          handleGoBack={handleGoBack}
          handleNext={handleNext}
          handleConfirmOrder={handleConfirmOrder}
        />
        <div className='text-red-500 text-sm font-semibold px-4 pt-4'>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      </div>
      {cart.data?.line_items?.length > 0 && (
        <div className='flex flex-col mb-8 rounded p-4 bg-white lg:ml-8 lg:mb-0'>
          <div className='flex'>
            <ShoppingCartTable notEditable items={cart.data?.line_items} />
          </div>
          <div className='flex px-4 justify-between'>
            <p className='text-xl font-semibold'>Subtotal</p>
            <p className='text-xl font-semibold text-blue-900'>{`$${cart.data?.subtotal.raw}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Checkout), {
  ssr: false,
});
