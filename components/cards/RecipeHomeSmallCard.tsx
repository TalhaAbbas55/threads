"use client";
import { SingleRecipe } from "@/lib/interfaces";
import { setRecipeData } from "@/lib/redux/DataSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const RecipeHomeSmallCard: React.FC = ({ dish, userId }: SingleRecipe) => {
  const router = useRouter();
  const navigateRoute = () => {
    router.push(`/search/SingleRecipe/${dish.id}?current=${userId}`);
  };
  return (
    <Image
      onClick={navigateRoute}
      src={dish.image}
      alt={dish.title}
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
