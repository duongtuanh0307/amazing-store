import {
  CustomerInfoType,
  ShippingInfoType,
  PaymentInfoType,
} from "../types/Customer";

export const defaultCustomer: CustomerInfoType = {
  firstName: "",
  lastName: "",
  email: "",
};

export const defaultShippingInfo: ShippingInfoType = {
  receiver: "",
  street: "",
  postalZipCode: "",
  city: "",
  province: "",
  country: "VN",
  shippingOption: "",
};

export const defaultPaymentInfo: PaymentInfoType = {
  cardNum: "",
  expMonth: "",
  expYear: "",
  cvv: "",
  billingPostalZipcode: "",
};
