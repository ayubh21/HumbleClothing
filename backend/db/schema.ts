import {
  date,
  serial,
  text,
  timestamp,
  pgTable,
  uuid,
  numeric,
  char,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// customer
export const customer = pgTable("user", {
  customerId: serial("customer_id").primaryKey().notNull(),
  firstName: varchar("firstName", { length: 20 }).notNull(),
  lastName: varchar("lastName", { length: 20 }),
  email: varchar("email", { length: 25 }).notNull(),
  age: integer("age"),
  city: text("city").notNull(),
  address: varchar("address").notNull(),
  postalCode: char("postal_code", { length: 6 }).notNull(),
  createdAt: timestamp("created_at").notNull(),
});

//Products
export const products = pgTable("products", {
  product_id: serial("id").primaryKey().notNull(),
  productDescription: text("desc").notNull(),
  sku: varchar("sku", { length: 20 }).notNull(),
  price: numeric("price", { precision: 4, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  categoryId: serial("category_id").references(() => category.categoryId),
  inventoryId: serial("inventory_id").references(() => inventory.inventoryId),
  productImage: varchar("product_image"),
});

//category
export const category = pgTable("category", {
  categoryId: serial("category_id").primaryKey().notNull(),
  name: varchar("name", { length: 10 }).notNull(),
  categoryDescription: text("desc").notNull(),
});

//Inventory
export const inventory = pgTable("inventory", {
  inventoryId: integer("inventory_id").primaryKey().notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

//cart
export const cart = pgTable("cart", {
  cartId: uuid("cart_id").primaryKey().notNull(),
  productId: serial("product_id")
    .references(() => products.product_id)
    .notNull(),
  quantity: integer("quanitity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

//order
export const order = pgTable("order", {
  orderId: serial("order_id").primaryKey().notNull(),
  quantity: integer("quantity").notNull(),
  productId: serial("product_id")
    .references(() => products.product_id)
    .notNull(),
  orderDate: date("order_date").notNull(),
  trackingNumber: integer("tracking_number").notNull(),
  status: varchar("status").notNull().default("delivered"),
  shippingAddress: varchar("shipping_address").notNull(),
  orderDetailsId: integer("order_detail_id")
    .references(() => orderDetails.orderDetailsId)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

//order details
export const orderDetails = pgTable("order_details", {
  orderDetailsId: integer("order_detail_id").primaryKey().notNull(),
  total: numeric("total", { precision: 100, scale: 20 }),
  paymentId: integer("payment_id").references(() => paymentDetail.paymentId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const paymentDetail = pgTable("payment_detail", {
  paymentId: integer("payment_id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
