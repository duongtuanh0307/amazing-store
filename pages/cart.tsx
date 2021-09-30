import { useContext } from "react";
import { Store } from "../components/Store";
import Link from "next/link";
import { ShoppingCartTable } from "../components/ShoppingCartTable";
import getCommerce from "../utils/commerce";
import router from "next/router";
import dynamic from "next/dynamic";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const handleRemoveFromCart = async (lineItemId: string) => {
    const commerce = getCommerce();
    const cartData = await commerce.cart.remove(lineItemId);
    dispatch({ type: "CART_RETRIEVE_SUCCESS", payload: cartData.cart });
  };

  const handleChangeQuantity = async (lineItemId: string, quantity: number) => {
    const commerce = getCommerce();
    const cartData = await commerce.cart.update(lineItemId, { quantity });
    dispatch({ type: "CART_RETRIEVE_SUCCESS", payload: cartData.cart });
  };

  const handleProceedCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className='w-full mb-8 p-8'>
      <div className='w-full h-full bg-white px-8 pb-16 pt-12 rounded'>
        {cart.loading ? (
          <div>Loading Your Cart ... </div>
        ) : cart.data?.line_items.length === 0 ? (
          <div className='flex justify-center text-2xl'>
            Your Cart Is Still Empty!&nbsp;
            <Link href='/'>
              <p className='text-blue-900 cursor-pointer font-semibold'>
                Go Shopping
              </p>
            </Link>
          </div>
        ) : (
          <>
            <h3 className='text-3xl tracking-wider font-bold mb-8 ml-4'>
              Shopping Cart
            </h3>
            <div className='flex w-full'>
              <div className='w-3/4 mr-12'>
                <ShoppingCartTable
                  items={cart.data.line_items}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </div>
              <div className='w-64  h-36 px-8 py-4 rounded border border-gray-200'>
                <div className='flex text-lg font-semibold items-end'>
                  <p className='mr-4'>Subtotal:</p>
                  <p className='text-2xl text-blue-900'>{`$${cart.data.subtotal.raw}`}</p>
                </div>
                <button
                  className='py-2 px-4 my-4 rounded bg-blue-900 text-white'
                  onClick={() => handleProceedCheckout()}
                >
                  proceed to checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
