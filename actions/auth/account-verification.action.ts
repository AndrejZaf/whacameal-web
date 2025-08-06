import { auth } from "@/auth";

export const accountVerification = async (tokenId: string) => {
  try {
    const data = await auth.api.verifyEmail({
      query: {
        token: tokenId,
      },
    });
  } catch (error) {
    console.error("Error verifying account:", error);
    return { error: "An error occurred while verifying your account." };
  }
};
