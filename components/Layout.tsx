import { FC, useEffect, useContext } from "react";
import getCommerce from "../utils/commerce";
import { Store } from "../components/Store";
import Head from "next/head";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type Props = {
  commercePublicKey: string;
};

const Layout: FC<Props> = ({ children, commercePublicKey }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const fetchCart = async () => {
    const commerce = getCommerce(commercePublicKey);
    dispatch({ type: "CART_RETRIEVE_REQUEST" });
    const cartData = await commerce.cart.retrieve();
    dispatch({ type: "CART_RETRIEVE_SUCCESS", payload: cartData });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <Head>
        <title>Awesome Store</title>
        <meta
          name='description'
          content='Awesome Store - a van that sells mysterious items'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col bg-amazing-world bg-cover bg-no-repeat'>
        <Navbar cartData={cart} />
        <div className='flex flex-col justify-between min-h-screen h-full overflow-auto'>
          <main className='flex mt-16 p-4 pt-12'>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
