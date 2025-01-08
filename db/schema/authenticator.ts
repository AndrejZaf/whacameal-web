import { boolean, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { users } from "./user";

export const authenticators = pgTable(
    "authenticator",
    {
        credentialID: text("credential_id")
            .notNull()
            .unique(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("provider_account_id")
            .notNull(),
        credentialPublicKey: text("credential_public_key")
            .notNull(),
        counter: integer("counter")
            .notNull(),
        credentialDeviceType: text("credential_device_type")
            .notNull(),
        credentialBackedUp: boolean("credential_backed_up")
            .notNull(),
        transports: text("transports")
    },
    (authenticator) => [
        {
            compositePK: primaryKey({
                columns: [authenticator.userId, authenticator.credentialID]
            })
        }
    ]
);