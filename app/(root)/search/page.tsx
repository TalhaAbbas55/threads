import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";

import SearchMode from "@/components/cards/SearchMode";
import { getRecipeInfoByUri } from "@/lib/actions/recipes.action";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const value = encodeURIComponent(
    "http://www.edamam.com/ontologies/edamam.owl#recipe_c9ed14d96afe9571ed5fbba8b7c883a1"
  );
  const data = await getRecipeInfoByUri(`uri=${value}`);

  console.log(data.data.hits);
  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="flex justify-between">
        <SearchMode label="Search by Ingredients" mode="IngredientsBased" />
        <SearchMode label="Search by Recipe Name" mode="RecipeName" />
      </div>
    </section>
  );
}

export default Page;
