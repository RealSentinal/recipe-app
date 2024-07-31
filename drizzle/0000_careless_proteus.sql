CREATE TABLE IF NOT EXISTS "recipes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"author_id" text,
	"content" json,
	"views" bigint,
	"likes" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar(64) NOT NULL,
	"hashed_password" text NOT NULL,
	"saved_recipes" text[]
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
