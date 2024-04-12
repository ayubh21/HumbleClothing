export type Product = {
  product?: [];
  productDescription: string;
  sku: string;
  price: number;
  categoryId?: number;
  inventoryId?: number;
  productImage: string;
};

export type Category = {
  id: number;
  name: string;
  categoryDescription: string;
};

export type editC = {
  categoryDescription: string;
  name: string;
};

export type Order = {
  // need to do
};
