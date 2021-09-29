import { Product } from "./Product";

export type CartState = {
  loading: boolean;
  data?: CartData;
};

export type CartData = {
  id: string;
  total_items: number;
  line_items: CartItem[];
  subtotal: {
    raw: number;
  };
};

export type CartItem = {
  id: string;
  product_id: string;
  name: string;
  quantity: number;
  price: {
    raw: number;
  };
};

export type ShippingOption = {
  description: string;
  id: string;
  price: {
    raw: number;
  };
};

type Transaction = {
  gateway_name: string;
  gateway_reference: string;
  gateway_transaction_id: string;
};

export type OrderInfo = {
  id: string;
  customer: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  shipping: {
    name: string;
    street: string;
    town_city: string;
    postal_zip_code: string;
    country: string;
  };
  order: {
    line_items: CartItem[];
    subtotal: { raw: number };
    tax: { amount: { raw: number } };
    shipping: { price: { raw: number } };
    total_with_tax: { raw: number };
  };
  transactions: Transaction[];
};
