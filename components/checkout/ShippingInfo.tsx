import { FC, useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { ShippingOption } from "../../types/Cart";
import { ShippingInfoType } from "../../types/Customer";
import getCommerce from "../../utils/commerce";

type Props = {
  shippingInfo: ShippingInfoType;
  handleChangeShippingInfo: (
    key: keyof ShippingInfoType,
    value: string
  ) => void;
  checkoutTokenId: string;
};

const LABELS = ["Receiver", "Street", "Postal/Zip code", "City"];

export const ShippingInfo: FC<Props> = ({
  shippingInfo,
  handleChangeShippingInfo,
  checkoutTokenId,
}) => {
  const freeInputFields: (keyof ShippingInfoType)[] = [
    "receiver",
    "street",
    "postalZipCode",
    "city",
  ];
  const [provinces, setProvinces] = useState<{ html?: string }>({});
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);

  useEffect(() => {
    if (!!shippingInfo.country) getProvinces();
    return () => setProvinces({});
  }, [shippingInfo.country]);

  useEffect(() => {
    if (!!shippingInfo.country && !!shippingInfo.province) getShippingOptions();
    return () => setShippingOptions([]);
  }, [shippingInfo.province]);

  const getProvinces = async () => {
    const commerce = getCommerce();
    const provincesList = await commerce.services.localeListSubdivisions(
      shippingInfo.country
    );
    setProvinces(provincesList);
  };

  const getShippingOptions = async () => {
    const commerce = getCommerce();
    const shippingOptions = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country: shippingInfo.country,
        province: shippingInfo.province,
      }
    );
    setShippingOptions(shippingOptions);
    handleChangeShippingInfo("shippingOption", shippingOptions[0]?.id || "");
  };

  return (
    <div className='p-4 mb-4'>
      {freeInputFields.map((field, index) => (
        <div className='pt-4 flex flex-col' key={index}>
          <label htmlFor={field} className='text-sm font-bold pb-1'>
            {LABELS[index]}
          </label>
          <input
            className='border rounded py-1 px-4 focus:border-green-500 focus:outline-none'
            value={shippingInfo[field]}
            type='text'
            id={field}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeShippingInfo(field, e.target.value)
            }
          />
        </div>
      ))}
      <div className='pt-4 flex flex-col'>
        <label htmlFor='provinces' className='text-sm font-bold pb-1'>
          Province
        </label>
        <select
          id='provinces'
          name='provinces'
          dangerouslySetInnerHTML={{ __html: provinces.html }}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChangeShippingInfo("province", e.target.value)
          }
          value={shippingInfo.province}
          className='py-1 pr-4 border-b-2 border-gray-200 focus:border-green-500 focus:outline-none'
        />
      </div>
      <div className='pt-4 flex flex-col'>
        <label htmlFor='shipping-options' className='text-sm font-bold pb-1'>
          Shipping Option
        </label>
        <select
          id='shipping-options'
          name='shipping-options'
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleChangeShippingInfo("shippingOption", e.target.value)
          }
          value={shippingInfo.province}
          className='py-1 pr-4 border-b-2 border-gray-200 focus:border-green-500 focus:outline-none'
        >
          {shippingOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >{`${option.description} ($${option.price.raw})`}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
