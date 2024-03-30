import RecipeCard from "@/components/cards/RecipeCard";
import { getRecipeInfoByUri } from "@/lib/actions/recipes.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const userData = await currentUser();
  if (!userData) redirect("/login");

  const userInfo = await fetchUser(userData.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  console.log(userInfo.favorites, "userInfo");

  let favorites: string = userInfo.favorites.reduce(
    (acc: string, curr: string) => {
      acc = `${acc}uri=${encodeURIComponent(curr)}&`;
      return acc;
    },
    ""
  );
  console.log(favorites, "favorites");

  const value = encodeURIComponent(
    "http://www.edamam.com/ontologies/edamam.owl#recipe_c9ed14d96afe9571ed5fbba8b7c883a1"
  );
  const data = await getRecipeInfoByUri(favorites);

  return (
    <>
      <h1 className="head-text mb-10">Favorites</h1>

      {data?.data?.hits.map((dish: any, index: number) => (
        <div className="my-10">
          <RecipeCard
            userId={userData.id}
            isFavorite={userInfo?.favorites.includes(dish.recipe.uri) || false}
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
        </div>
      ))}
    </>
  );
};

export default page;
