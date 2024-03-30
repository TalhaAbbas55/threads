"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { Recipe, SingleRecipe } from "@/lib/interfaces";
import AddtoFavorites from "@/public/assets/favorites-star-svgrepo-com";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRecipeData } from "@/lib/redux/DataSlice";
import { toggleFromFavorites } from "@/lib/actions/user.actions";
import { useState } from "react";

function RecipeCard({
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
  userId,
  isFavorite,
}: SingleRecipe) {
  const urlObject = new URL(url || "");
  const router = useRouter();
  const dispatch = useDispatch();
  const [favorite, setfavorite] = useState(isFavorite);

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
        userId,
        isFavorite: favorite,
      })
    );
    router.push(`/search/SingleRecipe/${label}`);
  };
  const handleAddToFavorites = async () => {
    const response = userId && (await toggleFromFavorites(userId, uri || ""));
    setfavorite(!favorite);
  };
  return (
    <article className="community-card w-full">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex w-full justify-between items-center">
          <Link
            href={shareAs || "#"}
            className="relative "
            style={{ height: "100px", width: "100px" }}
            target="_blank"
          >
            <Image
              src={image || ""}
              alt="community_logo"
              fill
              className="rounded-full object-cover"
            />
          </Link>
          <div className="cursor-pointer" onClick={handleAddToFavorites}>
            <AddtoFavorites fill={favorite ? "yellow" : "#fff"} />
          </div>
        </div>

        <div>
          <Link href={shareAs || ""} target="_blank">
            <h4 className="text-base-semibold text-light-1">{label}</h4>
          </Link>
        </div>
      </div>

      <h2 className="text-sm text-light-2 mt-4">Ingredients</h2>

      <ul
        style={{ listStyleType: "circle", color: "white" }}
        className="ml-4 mr-2 my-4"
      >
        {ingredientLines?.slice(0, 4).map((ingredient, index) => (
          <li>
            <p key={index} className="text-sm text-light-2">
              {ingredient}
            </p>
          </li>
        ))}
        {ingredientLines?.length && ingredientLines?.length > 4 && (
          <p className="text-light-3">and more...</p>
        )}
      </ul>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Button
          size="sm"
          className="community-card_btn"
          onClick={navigateRoute}
        >
          View
        </Button>
      </div>

      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5">
          <h1 className="text-light-1">Meal Type</h1>
          <p className="text-light-3">{mealType}</p>
        </div>
        <div className="flex gap-5">
          <Link
            href={`${urlObject.protocol}${urlObject.hostname}` || ""}
            target="_blank"
          >
            <h1 className="text-light-1">Source</h1>
            <p className="text-light-3">{source}</p>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
