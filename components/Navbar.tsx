import { useRouter } from "next/router";
import { FC } from "react";
import CartIcon from "./icons/Cart";
import { CartState } from "../types/Cart";
import HomeIcon from "./icons/Home";

type Props = {
  cartData: CartState;
};

export const Navbar: FC<Props> = ({ cartData }) => {
  const router = useRouter();

  return (
    <div className='flex flex-row fixed w-full justify-between p-8 bg-transparent'>
      <div
        className='text-4xl tracking-wider uppercase font-bold text-blue-900 cursor-pointer bg-white rounded-full px-8 py-1 shadow-md'
        onClick={() => router.push("/")}
      >
        Awesome Store
      </div>
      <ul className='flex text-xl font-bold text-blue-900'>
        <li className='cursor-pointer mr-4' onClick={() => router.push("/")}>
          <div className='bg-white h-12 w-12 rounded-full flex justify-center items-center shadow-md'>
            <HomeIcon />
          </div>
        </li>
        <li className='cursor-pointer' onClick={() => router.push("/cart")}>
          <div className='relative'>
            <div className='bg-white h-12 w-12 rounded-full flex justify-center items-center shadow-md'>
              <CartIcon />
              {!cartData.loading && cartData.data.total_items > 0 && (
                <span className='absolute top-0 right-0 flex text-xs w-5 h-5 font-semibold text-white justify-center items-center rounded-full bg-red-700'>
                  {cartData.data.total_items}
                </span>
              )}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
