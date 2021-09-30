import react, { FC } from "react";
import { Product } from "../types/Product";
import { useRouter } from "next/router";

type Props = {
  product: Product;
};

export const ProductItem: FC<Props> = ({ product }) => {
  const router = useRouter();

  return (
    <div className='w-1/2 lg:w-1/3 px-4 pt-8'>
      <div
        className='flex flex-col h-full justify-between p-8 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-gray-200 bg-white'
        onClick={() => router.push(`/products/${product.permalink}`)}
      >
        <img
          className='object-contain h-full w-full bg-gray-900'
          src={product.assets[0]?.url || ""}
          alt={product.name}
        />
        <div className='mt-12 h-auto'>
          <p className='font-semibold text-lg'>{product.name}</p>
          <p className='text-blue-800 text-base font-semibold'>{`${product.price.raw}$`}</p>
        </div>
      </div>
    </div>
  );
};
