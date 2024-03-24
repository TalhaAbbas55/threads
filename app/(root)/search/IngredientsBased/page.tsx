import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Searchbar from "@/components/shared/Searchbar";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import RecipeSearch from "@/components/shared/RecipeSearch";
import { useEffect } from "react";
import { getApiWithoutAuth } from "@/lib/actions/recipes.action";
import RecipeCard from "@/components/cards/RecipeCard";
import { Recipe } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/shared/BackToTop";
interface SearchParams {
  [key: string]: string | undefined;
}

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  let response;

  const Ingredients: string = decodeURIComponent(searchParams.q || "");

  if (Ingredients?.length > 0) {
    response = await getApiWithoutAuth(
      `?q=${Ingredients}`,
      parseInt(searchParams?.start || ""),
      parseInt(searchParams.end || "")
    );
  }
  console.log(searchParams, "pa");

  return (
    <section>
      <h1 className="head-text mb-10">Search by Ingredients</h1>

      <RecipeSearch
        routeType="search/IngredientsBased"
        placeholder="Search Ingredients"
        count={response?.data.count}
      />

      <div className="mt-14 flex flex-col gap-9">
        <p className="head-text">
          Dishes List ({searchParams.start} ---- {searchParams.end} )
        </p>
        {response?.data.hits.map((dish: Recipe, index: number) => (
          <RecipeCard
            key={index}
            uri={dish.recipe.uri}
            label={dish.recipe.label}
            image={dish.recipe.image}
            source={dish.recipe.source}
            url={dish.recipe.url}
            shareAs={dish.recipe.shareAs}
            dietLabels={dish.recipe.dietLabels}
            healthLabels={dish.recipe.healthLabels}
            cautions={dish.recipe.cautions}
            ingredientLines={dish.recipe.ingredientLines}
            ingredients={dish.recipe.ingredients}
            calories={dish.recipe.calories}
            totalWeight={dish.recipe.totalWeight}
            totalTime={dish.recipe.totalTime}
            cuisineType={dish.recipe.cuisineType}
            mealType={dish.recipe.mealType}
            dishType={dish.recipe.dishType}
            totalNutrients={dish.recipe.totalNutrients}
            totalDaily={dish.recipe.totalDaily}
            digest={dish.recipe.digest}
          />
        ))}
      </div>

      <BackToTop />
    </section>
  );
}

export default Page;
