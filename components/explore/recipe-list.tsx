"use client";

import { findAll } from "@/actions/recipe/find-all.action";
import RecipeCard from "@/components/recipe-card";
import { Input } from "@/components/ui/input";
import { RecipeWithIngredients } from "@/db/types";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const RECIPES_PER_PAGE = 12;

const RecipeList = () => {
  const [recipes, setRecipes] = useState<RecipeWithIngredients[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const loadRecipes = useCallback(
    async (pageNum: number, search: string, isNewSearch = false) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        const result = await findAll(RECIPES_PER_PAGE, pageNum, search);

        if (isNewSearch) {
          setRecipes(result.data);
        } else {
          setRecipes((prev) => [...prev, ...result.data]);
        }

        const currentTotal = isNewSearch
          ? result.data.length
          : recipes.length + result.data.length;
        setHasMore(
          result.data.length === RECIPES_PER_PAGE &&
            currentTotal < result.totalCount
        );
      } catch (error) {
        console.error("Error loading recipes:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, recipes.length]
  );

  const loadMoreRecipes = useCallback(() => {
    if (!hasMore || isLoading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadRecipes(nextPage, debouncedSearchQuery);
  }, [hasMore, isLoading, page, debouncedSearchQuery, loadRecipes]);

  const { targetRef, resetFetching } = useInfiniteScroll(loadMoreRecipes, {
    threshold: 0.1,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (!isLoading) {
      resetFetching();
    }
  }, [isLoading, resetFetching]);

  useEffect(() => {
    setPage(1);
    setRecipes([]);
    setHasMore(true);
    loadRecipes(1, debouncedSearchQuery, true);
  }, [debouncedSearchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-16">
            <Image
              src="/whc-no-recipe.svg"
              alt="No recipes found"
              width={192}
              height={192}
              className="mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              {searchQuery
                ? `No recipes match "${searchQuery}". Try a different search term.`
                : "Start by adding some recipes to see them here."}
            </p>
          </div>
        )
      )}

      {hasMore && (
        <div ref={targetRef} className="flex justify-center items-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading more recipes...</span>
            </div>
          )}
        </div>
      )}

      {isLoading && recipes.length === 0 && (
        <div className="flex justify-center items-center py-16">
          <div className="flex items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-lg">Loading recipes...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
