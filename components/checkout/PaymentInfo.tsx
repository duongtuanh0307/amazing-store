import { ChangeEvent } from "react";
import { PaymentInfoType } from "../../types/Customer";

type Props = {
  paymentInfo: PaymentInfoType;
  handleChangePaymentInfo: (key: keyof PaymentInfoType, value: string) => void;
};

const LABELS = [
  "Card Number",
  "Expiration Month",
  "Expiration Year",
  "CVV",
  "Billing Postal Zipcode",
];

export const PaymentInfo = ({ paymentInfo, handleChangePaymentInfo }) => {
  const fieldsArr = Object.keys(paymentInfo);
  return (
    <div className='p-4 mb-4'>
      {fieldsArr.map((field, index) => (
        <div className='pt-4 flex flex-col' key={index}>
          <label className='text-sm font-bold pb-1'>{LABELS[index]}</label>
          <input
            className='border rounded py-1 px-4 focus:border-green-500 focus:outline-none'
            value={PaymentInfo[field]}
            type='text'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePaymentInfo(field, e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
};
