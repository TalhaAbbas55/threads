"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDatabase } from "./mongoose";
import Thread from "../models/thread.models";
import { FilterQuery, SortOrder } from "mongoose";


interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path
}: Params): Promise<void> {
  connectToDatabase();

  try {
    await User.findOneAndUpdate(
    {
      id: userId,
    },
    {
      username: username.toLowerCase(),
      name,
      image,

      bio,
      onboarded: true,
    },
    {
      upsert: true, // this means if the model is already created, use it, else create a new one
    }
  );

  if(path === '/profile/edit'){
    revalidatePath(path);
  }
  } catch (error) {
    throw new Error("Error while create/updating user" + error);
    
  }
}


export async function fetchUser (userId:string) {
  try {
    connectToDatabase();

    return await User.findOne({id: userId});
    // .populate({
    //   path:'communities',
    //   model: 'Community',
    // })
  } catch (error) {
    throw new Error("Error while fetching user" + error);
  }
}

export async function fetchUserPosts (userId:string) {
  try {
    connectToDatabase();

    // find all threads authored by the user with given userId

    // TODO : populate community

    return await User.findOne({id:userId})
    .populate({
      path: 'threads',
      model: Thread,
      populate:{
        path: 'children',
        model: Thread,
        populate:{
          path: 'author',
          model: User,
          select: 'name image _id id'
        }
      }
    })
    } catch (error:any) {
    throw new Error("Error while fetching user posts" + error.message);
  }
}


export async function fetchUsers({
  userId,
  searchString ="",
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc'
}:{
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}){
  try {
    connectToDatabase();
    const skipAmount = (pageNumber - 1) * pageSize;  // 

    const regex = new RegExp(searchString, 'i');

    const query: FilterQuery<typeof User>= {
      id:{$ne: userId}
    }

    if(searchString.trim() !==''){
      query['$or'] = [
        {name: regex},
        {username: regex}
      ]
    }

    const sortOptions = {createdAt: sortBy};

    const usersQuery = User.find(query)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query)

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return{
      users,
      isNext
    }
    
  } catch (error) {
    throw new Error("Error while fetching users" + error);
    
  }
}

export async function getActivity(userId: string){
  try {
    connectToDatabase();

    // find all threads authored by the user with given userId

    const userThreads = await Thread.find({author: userId});

   // collect all ther child thread ids (replies) from the 'childred' field of the userThreads
   
   const childThreadIds = userThreads.reduce((acc, thread) => {
      return acc.concat(thread.children);
    },[]);

    const replies = await Thread.find(
      {_id: {$in: childThreadIds},
    author: {$ne: userId}
  }).populate({
    path: 'author',
    model: User,
    select: 'name image _id id'
  })

  return replies;

  } catch (error:any) {
    throw new Error("Error while fetching activity" + error.message);
  }

}