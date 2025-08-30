import HeroSection from "@/components/home/hero-section";
import TopPicks from "@/components/home/top-picks";
import TopPicksSkeleton from "@/components/home/top-picks-skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="space-y-5">
      <HeroSection />
      <Suspense fallback={<TopPicksSkeleton />}>
        <TopPicks />
      </Suspense>
    </div>
  );
}
