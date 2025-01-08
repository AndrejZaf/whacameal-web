CREATE TABLE "account"
(
    "user_id"             text NOT NULL,
    "type"                text NOT NULL,
    "provider"            text NOT NULL,
    "provider_account_id" text NOT NULL,
    "refresh_token"       text,
    "access_token"        text,
    "expires_at"          integer,
    "token_type"          text,
    "scope"               text,
    "id_token"            text,
    "session_state"       text
);
--> statement-breakpoint
CREATE TABLE "user"
(
    "id"             text PRIMARY KEY NOT NULL,
    "name"           text,
    "email"          text,
    "email_verified" timestamp,
    "image"          text,
    CONSTRAINT "user_email_unique" UNIQUE ("email")
);
--> statement-breakpoint
ALTER TABLE "account"
    ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("id") ON DELETE cascade ON UPDATE no action;