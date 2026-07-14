CREATE TABLE "leads" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"cpf" text NOT NULL,
	"plate" text NOT NULL,
	"zipcode" text NOT NULL,
	"usage" text NOT NULL,
	"young_driver" text NOT NULL,
	"status" text DEFAULT 'PENDENTE' NOT NULL,
	"created_at" text NOT NULL
);
