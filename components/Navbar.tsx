import { useRouter } from "next/router";
import { FC } from "react";
import CartIcon from "../public/assets/Cart";
import { CartState } from "../types/Cart";

type Props = {
  cartData: CartState;
};

export const Navbar: FC<Props> = ({ cartData }) => {
  const router = useRouter();
  const hideTotalItem = router.pathname.includes("/cart");

  return (
    <div className='flex flex-row fixed w-full justify-between px-8 py-4 bg-gray-100'>
      <p
        className='text-2xl uppercase font-bold text-green-600 tracking-wider cursor-pointer'
        onClick={() => router.push("/")}
      >
        Amazing Store
      </p>
      <ul className='flex text-xl font-bold text-green-900'>
        <li className='cursor-pointer' onClick={() => router.push("/cart")}>
          <div className='relative'>
            <CartIcon />
            {!cartData.loading &&
              cartData.data.total_items > 0 &&
              !hideTotalItem && (
                <span className='absolute -top-2 -right-4 flex text-xs w-5 h-5 font-semibold text-white justify-center items-center rounded-full bg-red-700'>
                  {cartData.data.total_items}
                </span>
              )}
          </div>
        </li>
      </ul>
    </div>
  );
};
