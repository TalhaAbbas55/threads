import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { getRequestRecipe } from "@/lib/actions/recipes.action";

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
  const response = await getRequestRecipe(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_URL}/recipes/random?limitLicense=true&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  const responseTwo = await getRequestRecipe(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_URL}/recipes/random?limitLicense=true&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  const responseThree = await getRequestRecipe(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_URL}/recipes/random?limitLicense=true&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  const responseFour = await getRequestRecipe(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_URL}/recipes/random?limitLicense=true&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  console.log(response, responseThree, responseFour);
  return (
    <>
      <h4
        className="text-base-semibold text-light-1 mx"
        style={{ fontSize: "30px" }}
      >
        Top Picks
      </h4>
      <ScrollArea>
        <div className="flex ">
          {response?.data?.recipes?.map((dish: any, index: number) => (
            <div className="my-10">
              <RecipeHomeCard
                // userId={userData.id}
                // isFavorite={
                //   userInfo?.favorites.includes(dish.recipe.uri) || false
                // }
                key={index}
                dish={dish}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4" />
      <h4
        className="text-base-semibold text-light-1 my-5"
        style={{ fontSize: "30px" }}
      >
        Chef's Specials
      </h4>

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {responseTwo?.data?.recipes.map((dish: any, index: number) => (
            <RecipeHomeSmallCard key={index} dish={dish} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4" />
      <h4
        className="text-base-semibold text-light-1 mx"
        style={{ fontSize: "30px" }}
      >
        Weekend Specials
      </h4>
      <ScrollArea>
        <div className="flex ">
          {responseThree?.data?.recipes?.map((dish: any, index: number) => (
            <div className="my-10">
              <RecipeHomeCard
                // userId={userData.id}
                // isFavorite={
                //   userInfo?.favorites.includes(dish.recipe.uri) || false
                // }
                key={index}
                dish={dish}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4" />
      <h4
        className="text-base-semibold text-light-1 my-5"
        style={{ fontSize: "30px" }}
      >
        Gourmet Selection
      </h4>
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {responseFour?.data?.recipes.map((dish: any, index: number) => (
            <RecipeHomeSmallCard key={index} dish={dish} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Footer />
    </>
  );
}
