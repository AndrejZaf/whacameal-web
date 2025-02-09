import { z } from "zod";

export const AccountSchema = z.object({
    image: z.string()
});