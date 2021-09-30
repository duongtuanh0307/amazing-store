import { GetStaticProps } from "next";
import getCommerce from "../utils/commerce";
import { Product } from "../types/Product";
import { ProductItem } from "../components/ProductItem";

type Props = {
  products: Product[];
};

export default function Home(props: Props) {
  const { products } = props;
  return (
    <div className='w-full mb-8 px-8'>
      {products.length <= 0 ? (
        <div className='uppercase'>No product found</div>
      ) : (
        <div className='flex flex-wrap w-full'>
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,
    },
  };
};
