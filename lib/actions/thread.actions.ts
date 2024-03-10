"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDatabase } from "./mongoose"
import { model } from "mongoose";
import { Over_the_Rainbow } from "next/font/google";
import { auth } from "@clerk/nextjs";

interface Params {
    text: string,
    author: string
    communityId: string | null,
    path: string
}

export async function createThread({
    text,
    author,
    communityId,
    path
}:Params){

    try {
        
        connectToDatabase();
        const createdThread = await Thread.create({
            text,
            author,
            community: null,
            path
        });
        
        // update user
        
        await User.findByIdAndUpdate(author,{
            $push: {threads: createdThread._id}
        })
        
        revalidatePath(path);
    } catch (error:any) {
        throw new Error(`Error creating thread: ${error.message}`);
    }
}

export async function fetchPosts(pageNumber=1,pageSize=20){
    connectToDatabase();

    // calculate the number of posts to skip

    const skipAmount = pageSize * (pageNumber - 1);


    // fetch posts that have no parent
    const postsQuery =  Thread.find({
        parentId: {$in: [null,undefined]}

    }).sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(pageSize)
    .populate({path: 'author', model: User})
    .populate({path:'children',populate:{
        path: 'author',
        model: User,
        select: "_id name parentId image"
    }});


    const totalPostsCount = await Thread.countDocuments({        parentId: {$in: [null,undefined]} });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return {
        posts,
        isNext
    }


}


export async function fetchThreadById(id:string){
    connectToDatabase();

    try {

        // TODO: Populate Community
        const thread = await Thread.findById(id)
        .populate({path: 'author', model: User, select: "_id id name parentId  image"})
        .populate({
            path: 'children',
            populate:[
                {
                    path: 'author',
                    model: User,
                    select: "_id id name parentId  image"
                },
                {
                    path: 'children',
                    model: Thread,
                    populate:{
                        path: 'author',
                        model: User,
                        select: "_id id name parentId  image"
                    }
                }
            ]
        }).exec();
        return thread;
    } catch (error:any) {

        throw new Error(`Error fetching thread: ${error.message}`);
        
    }
}


export async function addCommentToThread(threadId:string,commentText:string,userId:string,path:string){
    connectToDatabase();
    try {

            const originalThread = await Thread.findById(threadId);
            if(!originalThread){
                throw new Error("Thread not found");
            }

            const commentThread = new Thread({
                text: commentText,
                author: userId,
                parentId: threadId,
            })

            const savedCommentThread = await commentThread.save();


            // update the original thread with the new comment

            originalThread.children.push(savedCommentThread._id);


            await originalThread.save();

            revalidatePath(path);

        
    } catch (error:any) {
        throw new Error(`Error adding comment to thread: ${error.message}`);
    }
}