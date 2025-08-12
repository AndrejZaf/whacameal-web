import RecipeList from "@/components/explore/recipe-list";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Explore",
  description: "Find your next meal",
};

const ExplorePage = () => {
  return <RecipeList />;
};
export default ExplorePage;
