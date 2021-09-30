import { ChangeEvent, FC, useState, useContext } from "react";
import getCommerce from "../../utils/commerce";
import { Product } from "../../types/Product";
import router from "next/router";
import { Store } from "../../components/Store";

type Props = {
  product: Product;
  relatedProducts: Product[];
};

const SingleProduct: FC<Props> = (props) => {
  const { product, relatedProducts } = props;
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [quantity, setQuantity] = useState<number>(1);
  const inStock = product.inventory.available > 0;

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value || "0");
    setQuantity(val);
  };

  const addToCartHandler = async () => {
    const commerce = getCommerce();
    const lineItem = cart.data?.line_items.find(
      (item) => item.product_id === product.id
    );
    if (lineItem) {
      const cartData = await commerce.cart.update(lineItem.id, {
        quantity,
      });
      dispatch({ type: "CART_RETRIEVE_SUCCESS", payload: cartData.cart });
    } else {
      const cartData = await commerce.cart.add(product.id, quantity);
      dispatch({ type: "CART_RETRIEVE_SUCCESS", payload: cartData.cart });
    }
  };

  return (
    <div className='w-full mb-8 p-8'>
      <div className='w-full h-full bg-white px-4 py-16 rounded'>
        <div className='flex flex-col px-8 w-full justify-around items-center pb-8 xl:flex-row'>
          <div className='flex w-full mr-12'>
            <img
              className='w-1/2 object-contain max-h-96 bg-gray-900'
              src={product.assets[0]?.url}
              alt={product.name}
            />
            <div className='flex flex-col w-1/2 ml-12'>
              <h3 className='font-semibold text-2xl'>{product.name}</h3>
              <div
                className='py-4'
                dangerouslySetInnerHTML={{ __html: `${product.description}` }}
              ></div>
            </div>
          </div>
          <div className='flex flex-col w-full min-w-96 p-8 mt-8 border border-gray-400 h-72 rounded lg:w-3/4 xl:w-96 xl:mt-0'>
            <div className='flex w-full justify-between py-2'>
              <p>Price</p>
              <p>{`$${product.price.raw}`}</p>
            </div>
            <div className='flex w-full justify-between py-2'>
              <p>Status</p>
              {inStock ? (
                <p className='bg-green-100 py-2 px-4 text-green-800 text-sm rounded-sm'>
                  In Stock
                </p>
              ) : (
                <p className='bg-red-100 py-2 px-4 text-red-800 text-sm rounded-sm'>
                  Unavailable
                </p>
              )}
            </div>
            {inStock && (
              <div className='flex w-full justify-between py-2'>
                <p>Quantity</p>
                <input
                  className='ml-4 text-right bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none w-full'
                  type='number'
                  min='0'
                  max='100'
                  value={quantity}
                  onChange={handleChangeQuantity}
                />
              </div>
            )}
            <button
              disabled={!inStock}
              className='uppercase text-base font-semibold rounded bg-blue-900 text-white py-2 mt-10 hover:bg-blue-500 active:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed'
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className='flex flex-col m-8 pt-4 max-w-full justify-around border-t border-gray-400'>
          <h3 className='text-xl mt-4 mb-4 font-semibold'>Related Product</h3>
          {relatedProducts?.length > 0 ? (
            <div className='flex flex-nowrap mt-4 w-full overflow-x-scroll'>
              {relatedProducts.slice(0, 5).map((product) => (
                <div
                  className='flex flex-col w-1/4 min-w-60 p-4 mr-4 justify-between cursor-pointer'
                  key={product.id}
                  onClick={() => router.push(`/products/${product.permalink}`)}
                >
                  <div className='flex justify-center h-full max-h-80'>
                    <img
                      className='object-contain h-full w-full bg-gray-900'
                      src={product.assets[0]?.url || ""}
                      alt={product.name}
                    />
                  </div>
                  <div className='mt-8'>
                    <p className='font-bold'>{product.name}</p>
                    <p className='text-blue-800 text-base font-semibold'>{`${product.price.raw}$`}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p> No Other Product</p>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const { permalink } = params;
  const commerce = getCommerce();

  const { data } = await commerce.products.list();
  const product = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });
  const relatedProducts = data.filter(
    (product) => product.permalink !== permalink
  );
  return {
    props: {
      product,
      relatedProducts,
    },
  };
}

export async function getStaticPaths() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink,
      },
    })),
    fallback: false,
  };
}

export default SingleProduct;
