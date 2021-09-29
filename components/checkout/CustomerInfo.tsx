import { ChangeEvent } from "react";
import { CustomerInfoType } from "../../types/Customer";

type Props = {
  customerInfo: CustomerInfoType;
  handleChangeCustomerInfo: (
    key: keyof CustomerInfoType,
    value: string
  ) => void;
};

const LABELS = ["First Name", "Last Name", "Email Address"];

export const CustomerInfo = ({ customerInfo, handleChangeCustomerInfo }) => {
  const fieldsArr = Object.keys(customerInfo);
  return (
    <div className='p-4 mb-4'>
      {fieldsArr.map((field, index) => (
        <div className='pt-4 flex flex-col' key={index}>
          <label className='text-sm font-bold pb-1'>{LABELS[index]}</label>
          <input
            className='border rounded py-1 px-4 focus:border-green-500 focus:outline-none'
            value={customerInfo[field]}
            type='text'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeCustomerInfo(field, e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
};
