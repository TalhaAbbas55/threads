import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  getApiWithoutAuth,
  getRequestRecipe,
} from "@/lib/actions/recipes.action";
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
  const response = await getRequestRecipe(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_URL}/recipes/random?limitLicense=true&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  const responseTwo = await getRequestRecipe(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_URL}/recipes/random?limitLicense=true&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
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

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {responseTwo?.data?.recipes.map((dish: any, index: number) => (
            <RecipeHomeSmallCard key={index} dish={dish} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Separator className="my-4" />
      <Footer />
    </>
  );
}
