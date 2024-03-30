"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

// import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { fetchUser, fetchUserSingle } from "@/lib/actions/user.actions";
import Community from "@/lib/models/community.model";

function PostThread({
  userId,
  repost,
  content,
  author,
  community,
}: {
  userId: string;
  repost: boolean;
  content: string;
  author: string;
  community: string;
}) {
  const organization = useOrganization();

  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: repost ? content : "",
      accountId: userId,
    },
  });

  useEffect(() => {
    // Fetch user data
    fetchUserSingle(userId)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        // Handle error
        throw new Error("Error while fetching user" + error);
      });
  }, [userId]);

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const response = await createThread({
      text: repost
        ? `${values.thread}
      
      
      ---(original post by ${author} in ${
            community ? +community + "Community" : ""
          })     
      `
        : values.thread,
      author: userData._id,
      communityId: organization ? organization.organization?.id || "" : null,
      path: pathname,
    });

    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className=" mt-10 text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={15}
                  placeholder="Enter your post"
                  className="no-focus border border-dark-4 bg-dark-3 text-light-1"
                  {...field}
                  value={field.value}
                  defaultValue={repost ? content : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {repost && (
          <p className="text-light-1">
            Original by {author}{" "}
            {community && (
              <span>
                in <b>{community} Community</b>
              </span>
            )}
          </p>
        )}

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
