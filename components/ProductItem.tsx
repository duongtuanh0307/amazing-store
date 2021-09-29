import react, { FC } from "react";
import { Product } from "../types/Product";
import { useRouter } from "next/router";

type Props = {
  product: Product;
};

export const ProductItem: FC<Props> = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className='flex flex-col justify-between w-1/3 min-h-96 mx-4 px-8 py-4 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-gray-200'
      onClick={() => router.push(`/products/${product.permalink}`)}
    >
      <img
        className='object-contain w-full max-h-80'
        src={product.assets[0]?.url || ""}
        alt={product.name}
      />
      <div className='mt-12'>
        <p className='font-semibold text-lg'>{product.name}</p>
        <p className='text-green-800'>{`${product.price.raw}$`}</p>
      </div>
    </div>
  );
};
