import RecipeCard from "@/components/recipe-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const TopPicks = () => {
    return (
        <div className="container mx-auto">
            <div className="text-center text-3xl font-semibold">Our Top Picks</div>
            <div className="cards">
                <RecipeCard />
            </div>
            <div className="text-center">
                <Link href="/explore">
                    <Button>Explore more</Button>
                </Link>
            </div>
        </div>
    );
};

export default TopPicks;
