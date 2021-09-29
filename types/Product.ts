type ProductImage = {
  id: string;
  url: string;
};

type Inventory = {
  managed: boolean;
  available: number;
};

export type Product = {
  id: string;
  assets: ProductImage[];
  created: number;
  updated: number;
  description: string;
  inventory: Inventory;
  name: string;
  price: {
    raw: number;
  };
  permalink: string;
};
