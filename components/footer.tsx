import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t bg-background mt-4 container mx-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <h3 className="text-lg font-semibold">Whac A Meal</h3>
            <p className="text-sm text-muted-foreground">Find your next meal</p>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <nav className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </nav>

            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Whac A Meal. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
