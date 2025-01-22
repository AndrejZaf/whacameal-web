import { clearTokens } from "@/actions/auth/clear-tokens.action";

export async function GET() {
    await clearTokens();
    return new Response();
}