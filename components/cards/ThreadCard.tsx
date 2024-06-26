import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "./DeleteThread";
import LikeThread from "../shared/LikeThread";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ShareThread from "../shared/ShareThread";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes?: string[];
  userDbId: string;
  files?: string[];
}

async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
  userDbId,
  files,
}: Props) {
  if (content === "new test with image") {
    console.log(files, "files");
  }
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            {files &&
              files?.length > 0 &&
              (files.length > 1 ? (
                <div className="flex justify-center">
                  <Carousel className="w-full max-w-xs align-middle">
                    <CarouselContent>
                      {files?.map((file, index) => (
                        <CarouselItem key={index}>
                          <Image
                            className="rounded-md my-4 "
                            key={index}
                            src={file}
                            alt={`Image ${index + 1}`}
                            width={500}
                            height={300}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious type="button" />
                    <CarouselNext type="button" />
                  </Carousel>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Image
                    className="rounded-md my-4 "
                    key={0}
                    src={files[0]}
                    alt={`Image ${0 + 1}`}
                    width={500}
                    height={300}
                  />
                </div>
              ))}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <LikeThread
                        currentUserId={userDbId}
                        threadId={id}
                        parentId={parentId}
                        authorName={author.name}
                        authorImage={author.image}
                        likes={likes || []}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Like</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={`/thread/${id}`}>
                        <Image
                          src="/assets/reply.svg"
                          alt="heart"
                          width={24}
                          height={24}
                          className="cursor-pointer object-contain"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reply</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {author.id !== currentUserId && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link
                          href={`/create-thread?repost=true&content=${content}&author=${author.name}&community=${community?.name}`}
                        >
                          <Image
                            src="/assets/repost.svg"
                            alt="heart"
                            width={24}
                            height={24}
                            className="cursor-pointer object-contain"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Repost</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <ShareThread threadUrl={`/thread/${id}`} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community ? (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      ) : (
        <p className="text-subtle-medium text-gray-1 mt-5">
          {formatDateString(createdAt)}
        </p>
      )}
    </article>
  );
}

export default ThreadCard;
