import { z } from "zod";

export const AppearanceSchema = z.object({
    theme: z.enum(["light", "dark"], {
        required_error: "Please select a theme.",
    }),
});