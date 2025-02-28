import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";

const RecipeCard = () => {
    return (
        <Card className="aspect-square">
            <CardHeader className="p-0">
                <img className="rounded-t-lg" src="./cover.webp" />
            </CardHeader>
            <CardContent className="text-xl font-bold">
                Double Smash Cheese Burger
            </CardContent>
            <CardFooter className="flex justify-between text-[#6B6B6B]">
                <div>20 minutes</div>
                <div>Gluten</div>
            </CardFooter>
        </Card>
    );
};
export default RecipeCard;
