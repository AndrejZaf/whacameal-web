CREATE TYPE "public"."token_type" AS ENUM('FORGOT_PASSWORD', 'VERIFICATION');--> statement-breakpoint
ALTER TABLE "verification_token" RENAME TO "token";--> statement-breakpoint
ALTER TABLE "token" RENAME COLUMN "identifier" TO "id";--> statement-breakpoint
ALTER TABLE "token"
    ADD COLUMN "type" "token_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "token"
    ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "token"
    ADD CONSTRAINT "token_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token" DROP COLUMN "token";