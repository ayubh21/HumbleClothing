import {
  date,
  serial,
  text,
  timestamp,
  pgTable,
  uuid,
  numeric,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

// users
export const users = pgTable("users", {
  userid: uuid("userid").primaryKey().notNull().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  salt: text("salt"),
  sessionToken: text("sessionToken"),
});

//Products
export const products = pgTable("products", {
  product_id: serial("id").primaryKey().notNull(),
  productDescription: text("desc").notNull(),
  sku: varchar("sku", { length: 20 }).notNull(),
  price: numeric("price", { precision: 4, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  categoryId: integer("category_id").references(() => category.categoryId),
  productImage: varchar("product_image"),
});

//category
export const category = pgTable("category", {
  categoryId: integer("category_id").primaryKey().notNull(),
  name: varchar("name", { length: 10 }).notNull(),
  categoryDescription: text("desc").notNull(),
});

//cart
export const cart = pgTable("cart", {
  cartId: uuid("cart_id").primaryKey().notNull(),
  productId: serial("product_id")
    .references(() => products.product_id)
    .notNull(),
  quantity: integer("quanitity").notNull(),
  sessionId: uuid("sessionId").notNull(),

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
  userid: uuid("userid").notNull(),
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

export const shoppping_session = pgTable("shopping_detail", {
  id: integer("id").primaryKey().notNull(),
  sessionId: uuid("sessionId").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
