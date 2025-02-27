import HeroSection from "@/components/home/hero-section";
import TopPicks from "@/components/home/top-picks";

export default function Home() {
    return (
        <div className="space-y-5">
            <HeroSection />
            <TopPicks />
        </div>
    );
}
