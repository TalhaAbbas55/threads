"use client";
import Image from "next/image";
import Link from "next/link";

import { Recipe, SingleRecipe } from "@/lib/interfaces";
import AddtoFavorites from "@/public/assets/favorites-star-svgrepo-com";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useRouter } from "next/navigation";
import { URL } from "url";

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
  } = recipeData;

  const router = useRouter();
  if (!label) router.push("/search");

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
          <div>
            <Link href={shareAs || ""} target="_blank">
              <h4 className="text-base-semibold text-light-1">{label}</h4>
            </Link>
          </div>
          <AddtoFavorites fill="#fff" />
        </div>
      </div>

      <h2 className="text-sm text-light-2 mt-4">
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
          {/* <Link
            href={
              `${urlObject?.protocol || ""}${urlObject?.hostname || ""}` || ""
            }
            target="_blank"
          > */}
          <h1 className="text-light-1">Source</h1>
          <p className="text-light-3">{source}</p>
          {/* </Link> */}
        </div>
      </div>

      <div>
        {(digest || []).map(
          (item, index) => (
            console.log(item, "item"),
            (
              <>
                <div key={index} className="flex gap-5">
                  <p className="text-light-3">{item.label}</p>
                  <p className="text-light-3">{item.total} g</p>
                  <p className="text-light-3">{item.daily} RDI</p>
                </div>
                <div>
                  {item.sub &&
                    item.sub.length > 0 &&
                    item.sub?.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex gap-5">
                        <p className="text-light-3">{subItem.label}</p>
                        <p className="text-light-3">{subItem.total} g</p>
                        <p className="text-light-3">{subItem.daily} RDI</p>
                      </div>
                    ))}
                </div>
              </>
            )
          )
        )}
      </div>

      <div className="text-light-1">
        See instructions at{" "}
        <a href={url || ""} target="_blank" className="text-light-1 underline">
          {source}
        </a>
      </div>
    </article>
  );
}

export default SingleRecipeDetail;
