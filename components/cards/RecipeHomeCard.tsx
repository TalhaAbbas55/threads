"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { Recipe, SingleRecipe } from "@/lib/interfaces";
import AddtoFavorites from "@/public/assets/favorites-star-svgrepo-com";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRecipeData } from "@/lib/redux/DataSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toggleFromFavorites } from "@/lib/actions/user.actions";
import { useState } from "react";

function RecipeHomeCard({
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
}: SingleRecipe) {
  const urlObject = new URL(url || "");
  const router = useRouter();
  const dispatch = useDispatch();

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
    <article
      className="community-card w-full cursor-pointer"
      style={{ minWidth: "300px" }}
      onClick={navigateRoute}
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex w-full justify-between items-center">
          <div>
            <Image
              src={image || ""}
              alt="community_logo"
              // fill
              className="rounded-full object-cover"
              style={{ minHeight: 250, minWidth: 250 }}
              width={250}
              height={250}
            />
          </div>
        </div>

        <div>
          <div>
            {label && label?.length > 20 ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <h4 className="text-base-semibold text-light-1">
                      {label?.substring(0, 20) + "..."}
                    </h4>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <h4 className="text-base-semibold text-light-1">
                {label?.substring(0, 20) + "..."}
              </h4>
            )}
          </div>
        </div>
      </div>

      <div className=" items-center my-4">
        <div className="flex justify-between">
          <h1 className="text-light-1">Meal Type</h1>
          <p className="text-light-3">{mealType}</p>
        </div>
        <div className="">
          <Link
            href={`${urlObject.protocol}${urlObject.hostname}` || ""}
            target="_blank"
            className="flex justify-between"
          >
            <h1 className="text-light-1">Source</h1>
            <p className="text-light-3">{source}</p>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RecipeHomeCard;
