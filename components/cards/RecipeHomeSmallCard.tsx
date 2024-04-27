"use client";
import { SingleRecipe } from "@/lib/interfaces";
import { setRecipeData } from "@/lib/redux/DataSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const RecipeHomeSmallCard: React.FC = ({
  uri,
  label,
  image,
  source,
  url,
  shareAs,
  dietLabels,
  healthLabels,
  cautions,
  ingredientLines,
  ingredients,
  calories,
  totalWeight,
  totalTime,
  cuisineType,
  mealType,
  dishType,
  totalNutrients,
  totalDaily,
  digest,
}: SingleRecipe) => {
  const dispatch = useDispatch();
  const urlObject = new URL(url || "");
  const router = useRouter();
  const navigateRoute = () => {
    dispatch(
      setRecipeData({
        uri,
        label,
        image,
        source,
        url,
        shareAs,
        dietLabels,
        healthLabels,
        cautions,
        ingredientLines,
        ingredients,
        calories,
        totalWeight,
        totalTime,
        cuisineType,
        mealType,
        dishType,
        totalNutrients,
        totalDaily,
        digest,
        sourceWebsiteUrl: `${urlObject.protocol}${urlObject.hostname}`,
      })
    );
    router.push(`/search/SingleRecipe/${label}`);
  };
  return (
    <Image
      onClick={navigateRoute}
      src={image}
      alt={label}
      width={130}
      height={130}
      className={cn(
        "h-auto w-auto object-cover transition-all hover:scale-105 cursor-pointer",
        "aspect-square"
      )}
    />
  );
};

export default RecipeHomeSmallCard;
