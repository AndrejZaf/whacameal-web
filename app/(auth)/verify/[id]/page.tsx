import { accountVerification } from "@/actions/auth/account-verification.action";
import AuthSidebar from "@/components/auth-sidebar";
import FormError from "@/components/form-error";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const verificationResult = await accountVerification(id);
  return (
    <div className="container relative h-screen flex-col items-center justify-center mx-auto md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthSidebar />
      <div className="flex justify-center align-middle lg:p-8 h-screen">
        <div className="mx-auto flex flex-col justify-center space-y-6 max-w-sm w-full">
          {verificationResult?.error ? (
            <FormError message={verificationResult?.error} />
          ) : (
            <>
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Your account has been successfully verified.
                </h1>
                <p className="text-sm text-muted-foreground">
                  Click on the login button below to redirect yourself to the
                  login screen.
                </p>
              </div>
            </>
          )}
          <Link href="/login">
            <Button className="w-full">Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Page;
