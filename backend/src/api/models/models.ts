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

export type User = {
  userid?: string;
  username: string;
  email: string;
  password: string;
  salt?: string | null;
  sessionToken?: string | null;
};

export type Order = {
  quantity: string;
  productId: number;
  orderDate: Date;
  trackingNumber: number;
  status: string;
  shippingAddress: string;
  product: [];
  shippingCost: number;
  tax: number;
  notes?: string;
};

export type Cart = {
  cartId: string;
  product?: [];
  productId: number;
  quantity: number;
  sessionId: string;
};
