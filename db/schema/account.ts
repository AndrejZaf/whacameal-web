import { users } from "@/db/schema/user";
import { AdapterAccountType } from "@auth/core/adapters";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const accounts = pgTable(
    "account",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type")
            .$type<AdapterAccountType>()
            .notNull(),
        provider: text("provider")
            .notNull(),
        providerAccountId: text("provider_account_id")
            .notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state")
    },
    (account) => [
        {
            compoundKey: primaryKey({
                columns: [account.provider, account.providerAccountId]
            })
        }
    ]
);