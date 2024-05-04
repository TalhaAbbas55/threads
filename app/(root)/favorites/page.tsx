import RecipeCard from "@/components/cards/RecipeCard";
import RecipeHomeCard from "@/components/cards/RecipeHomeCard";
import { getRequestRecipe } from "@/lib/actions/recipes.action";

import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const userData = await currentUser();
  if (!userData) redirect("/login");

  const userInfo = await fetchUser(userData.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  let response = null;
  console.log(userInfo?.favorites, "favorites");

  if (userInfo?.favorites?.length > 0) {
    console.log("favorites");
    response = await getRequestRecipe(
      `${
        process.env.NEXT_PUBLIC_SPOONACULAR_URL
      }/recipes/informationBulk?ids=${userInfo?.favorites?.join(",")}&apiKey=${
        process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
      }`
    );
  }
  console.log(response, "response");

  return (
    <>
      <h1 className="head-text mb-10">Favorites</h1>

      {response?.data?.length > 0 ? (
        response?.data?.map((dish: any, index: number) => (
          <div className="my-10">
            <RecipeHomeCard
              userId={userInfo?._id || ""}
              isFavorite={userInfo?.favorites?.includes(dish?.id) || false}
              key={index}
              dish={dish}
            />
          </div>
        ))
      ) : (
        <h1 className="text-light-1">No favorites yet</h1>
      )}
    </>
  );
};

export default page;
