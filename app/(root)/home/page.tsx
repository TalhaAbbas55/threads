import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { getApiWithoutAuth } from "@/lib/actions/recipes.action";
import { allIngredients } from "@/constants";

import { currentUser } from "@clerk/nextjs";
import RecipeHomeCard from "@/components/cards/RecipeHomeCard";
import { cn } from "@/lib/utils";
import RecipeHomeSmallCard from "@/components/cards/RecipeHomeSmallCard";
import Footer from "@/components/cards/Footer";

export const metadata: Metadata = {
  title: "Home",
  description: "List of common recipes.",
};

export default async function MusicPage() {
  const randomIngredientOne =
    allIngredients[Math.floor(Math.random() * allIngredients.length)];
  const randomIngredientTwo =
    allIngredients[Math.floor(Math.random() * allIngredients.length)];

  const responseOne = await getApiWithoutAuth(
    `?q=${randomIngredientOne.value}`,
    parseInt("0" || ""),
    parseInt("10" || "")
  );
  const responseTwo = await getApiWithoutAuth(
    `?q=${randomIngredientTwo.value}`,
    parseInt("0" || ""),
    parseInt("10" || "")
  );

  return (
    <>
      <ScrollArea>
        <div className="flex ">
          {/* {listenNowAlbums.map((album) => (
            <AlbumArtwork
              key={album.name}
              album={album}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          ))} */}
          {responseOne?.data?.hits.map((dish: any, index: number) => (
            <div className="my-10">
              <RecipeHomeCard
                // userId={userData.id}
                // isFavorite={
                //   userInfo?.favorites.includes(dish.recipe.uri) || false
                // }
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
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4" />

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {responseTwo?.data?.hits.map((dish: any, index: number) => (
            <RecipeHomeSmallCard
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4" />
      <Footer />
    </>
  );
}
