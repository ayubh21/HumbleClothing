CREATE TABLE IF NOT EXISTS "cart" (
	"cart_id" uuid PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"quanitity" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"category_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(10) NOT NULL,
	"desc" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"customer_id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(20) NOT NULL,
	"lastName" varchar(20),
	"email" varchar(25) NOT NULL,
	"age" integer,
	"city" text NOT NULL,
	"address" varchar NOT NULL,
	"postal_code" char(6) NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"inventory_id" integer PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"product_id" serial NOT NULL,
	"order_date" date NOT NULL,
	"tracking_number" integer NOT NULL,
	"status" varchar DEFAULT 'delivered' NOT NULL,
	"shipping_address" varchar NOT NULL,
	"order_detail_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"order_detail_id" integer PRIMARY KEY NOT NULL,
	"total" numeric(100, 20),
	"payment_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_detail" (
	"payment_id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"desc" text NOT NULL,
	"sku" varchar(20) NOT NULL,
	"price" numeric(4, 2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"category_id" integer,
	"inventory_id" integer,
	"product_image" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_order_detail_id_order_details_order_detail_id_fk" FOREIGN KEY ("order_detail_id") REFERENCES "order_details"("order_detail_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_payment_id_payment_detail_payment_id_fk" FOREIGN KEY ("payment_id") REFERENCES "payment_detail"("payment_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_inventory_id_inventory_inventory_id_fk" FOREIGN KEY ("inventory_id") REFERENCES "inventory"("inventory_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
