import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const userData = await currentUser();
  if (!userData) redirect("/login");

  const userInfo = await fetchUser(userData.id);

  if (!userInfo?.onboarded) redirect("/onboarding");
  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userData.id} />
    </>
  );
};

export default page;
