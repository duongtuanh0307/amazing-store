import { ChangeEvent, FC } from "react";
import { CartItem } from "../types/Cart";
import RemoveIcon from "./icons/Remove";

type Props = {
  items: CartItem[];
  handleChangeQuantity?: (itemId: string, quantity: number) => void;
  handleRemoveFromCart?: (itemId: string) => void;
  notEditable?: boolean;
};

export const ShoppingCartTable: FC<Props> = ({
  items,
  handleChangeQuantity,
  handleRemoveFromCart,
  notEditable,
}) => {
  return (
    <table className='m-4 w-full'>
      <thead>
        <tr className='border-b border-gray-200'>
          <th className='p-2'>Name</th>
          <th className='p-2'>Quantity</th>
          <th className='p-2'>Price</th>
          {!notEditable && <th className='p-2'>Action</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const changeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
            const quantity = parseInt(e.target.value) || 0;
            if (handleChangeQuantity) handleChangeQuantity(item.id, quantity);
          };
          return (
            <tr key={item.id} className='border-b border-gray-200 py-2'>
              <td className='p-2'>{item.name}</td>
              <td className='p-2 text-center'>
                {notEditable ? (
                  <p>{item.quantity}</p>
                ) : (
                  <input
                    type='number'
                    value={item.quantity}
                    onChange={changeQuantity}
                    className='text-right bg-gray-100 border-b-2 border-gray-200 focus:border-green-500 focus:outline-none w-16'
                  />
                )}
              </td>
              <td className='p-2 text-center'>{`$${item.price.raw}`}</td>
              {!notEditable && (
                <td className='p-2 text-center'>
                  <button
                    className='border-2 border-red-600 px-4 rounded text-red-600'
                    onClick={() => {
                      if (handleChangeQuantity) handleRemoveFromCart(item.id);
                    }}
                  >
                    <RemoveIcon />
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
