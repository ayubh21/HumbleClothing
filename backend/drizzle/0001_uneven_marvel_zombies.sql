CREATE TABLE IF NOT EXISTS "cart" (
	"cart_id" uuid PRIMARY KEY NOT NULL,
	"product_id" serial NOT NULL,
	"quanitity" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(10) NOT NULL,
	"desc" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"inventory_id" integer PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp,
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
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"order_detail_id" integer PRIMARY KEY NOT NULL,
	"total" numeric(100, 20),
	"payment_id" integer,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_detail" (
	"payment_id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"desc" text NOT NULL,
	"sku" varchar(10) NOT NULL,
	"price" numeric(5, 2) NOT NULL,
	"created_at" timestamp,
	"category_id" serial NOT NULL,
	"inventory_id" serial NOT NULL,
	"product_image" varchar
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE varchar(25);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "customer_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "firstName" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastName" varchar(20);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "age" integer;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "address" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "postal_code" char(6) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
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
