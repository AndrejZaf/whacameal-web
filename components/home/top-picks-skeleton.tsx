import Link from "next/link";
import RecipeCardSkeleton from "../recipe-card-skeleton";
import { Button } from "../ui/button";

const TopPicksSkeleton = () => {
  return (
    <div className="container mx-auto space-y-6">
      <div className="text-center text-3xl font-semibold">Our Top Picks</div>
      <div className="cards grid grid-cols-1 px-4 md:px-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/explore">
          <Button>Explore more</Button>
        </Link>
      </div>
    </div>
  );
};

export default TopPicksSkeleton;
