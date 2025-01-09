ALTER TABLE "user" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "user"
    ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user"
    ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user"
    ADD CONSTRAINT "user_username_unique" UNIQUE ("username");