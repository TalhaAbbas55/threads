"use client";
import Image from "next/image";
import Link from "next/link";

import { Recipe, SingleRecipe } from "@/lib/interfaces";
import AddtoFavorites from "@/public/assets/favorites-star-svgrepo-com";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toggleFromFavorites } from "@/lib/actions/user.actions";

function SingleRecipeDetail() {
  const recipeData: SingleRecipe = useSelector(
    (state: RootState) => state.data.recipeData
  );

  const {
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
    sourceWebsiteUrl,
    userId,
    isFavorite,
  } = recipeData;
  console.log(recipeData, "recipeData");

  const router = useRouter();
  if (!label) router.push("/search");

  const [favorite, setfavorite] = useState(isFavorite);
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
            style={{ height: "150px", width: "150px" }}
            target="_blank"
          >
            <Image
              src={image || ""}
              alt="community_logo"
              fill
              className="rounded-full object-cover"
            />
          </Link>
          <div>
            <Link href={shareAs || ""} target="_blank">
              <h4 className="text-base-semibold text-light-1">{label}</h4>
            </Link>
          </div>
          <div className="cursor-pointer" onClick={handleAddToFavorites}>
            <AddtoFavorites fill={favorite ? "yellow" : "#fff"} />
          </div>
        </div>
      </div>

      <h2 className="text-sm text-light-2 mt-5">
        {" "}
        {ingredientLines?.length || ""} Ingredients
      </h2>

      <ul
        style={{ listStyleType: "circle", color: "white" }}
        className="ml-4 mr-2 my-4"
      >
        {ingredientLines?.map((ingredient, index) => (
          <li>
            <p key={index} className="text-sm text-light-2">
              {ingredient}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center my-4">
        <div className="flex gap-5">
          <h1 className="text-light-1">Meal Type</h1>
          <p className="text-light-3">{mealType}</p>
        </div>
        <div className="flex gap-5">
          <Link href={sourceWebsiteUrl || ""} target="_blank">
            <h1 className="text-light-1">Source</h1>
            <p className="text-light-3">{source}</p>
          </Link>
        </div>
      </div>

      <h1 className="text-light-1 head-text mt-5 mb-5">Nutrition Digest</h1>

      <div>
        {(digest || []).map((item, index) => (
          <>
            <div key={index} className="flex ">
              <p className="text-light-2" style={{ width: "60%" }}>
                {item.label} main
              </p>
              <p className="text-light-3" style={{ width: "20%" }}>
                {item.total?.toFixed(0)} g
              </p>
              <p className="text-light-3" style={{ width: "20%" }}>
                {item.daily?.toFixed(0)} RDI
              </p>
            </div>
            <div>
              {item.sub &&
                item.sub.length > 0 &&
                item.sub?.map((subItem, subIndex) => (
                  <div key={subIndex} className="flex  text-light-3">
                    <p className="text-light-3 pl-10" style={{ width: "60%" }}>
                      {subItem.label}
                    </p>
                    <p className="text-light-3" style={{ width: "20%" }}>
                      {subItem.total?.toFixed(0)} g
                    </p>
                    <p className="text-light-3" style={{ width: "20%" }}>
                      {subItem.daily?.toFixed(0)} RDI
                    </p>
                  </div>
                ))}
            </div>
          </>
        ))}
      </div>

      <h1 className="text-light-1 head-text mt-5 mb-5">Preparation</h1>

      <div className="text-light-1">
        See {"   "}
        <Button className="mx-2">
          <a
            href={url || ""}
            target="_blank"
            className="text-light-1 underline"
          >
            instructions
          </a>
        </Button>
        {"   "}
        at{" "}
        <a
          href={sourceWebsiteUrl || ""}
          target="_blank"
          className="text-light-1 underline"
        >
          {source}
        </a>
      </div>
      <Dialog>
        <DialogTrigger>
          <h3 className="text-light-1">Instructions</h3>
        </DialogTrigger>
        <DialogContent>
          <iframe src={url} className="w-full h-96" title="Instructions" />
        </DialogContent>
      </Dialog>
    </article>
  );
}

export default SingleRecipeDetail;
