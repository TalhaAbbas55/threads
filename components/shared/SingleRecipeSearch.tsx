"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { allIngredients } from "@/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import page from "@/app/(root)/activity/page";
import { Input } from "../ui/input";

interface Props {
  routeType: string;
  placeholder: string;
  count: number;
}

interface Ingredient {
  label: string;
  value: string;
}

function SingleRecipeSearch({ routeType, placeholder, count }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<{
    start: number;
    end: number;
  }>({
    start: 1,
    end: 10,
  });

  // / query after 0.3s of no input
  const handleSearch = (pagesParam: { start: number; end: number }) => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 0) {
        router.push(
          `/search/RecipeName?q=${encodeURIComponent(search)}&start=${
            pagesParam.start
          }&end=${pagesParam.end}`
        );
      } else {
        router.push(`/search/RecipeName`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  };

  const handlePages = (type: string) => {
    if (type === "+") {
      setPages({
        start: pages.start + 10,
        end: pages.end + 10,
      });
      handleSearch({
        start: pages.start + 10,
        end: pages.end + 10,
      });
    } else {
      setPages({
        start: pages.start - 10,
        end: pages.end - 10,
      });
      handleSearch({
        start: pages.start - 10,
        end: pages.end - 10,
      });
    }
  };

  return (
    <>
      <div className="searchbar">
        <Image
          src="/assets/search-gray.svg"
          alt="search"
          width={24}
          height={24}
          className="object-contain"
        />
        <Input
          id="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search Recipe by Name`}
          className="no-focus searchbar_input"
        />
        <Button
          size="sm"
          className="community-card_btn"
          onClick={() => {
            handleSearch(pages);
          }}
        >
          Search
        </Button>
      </div>

      <div className="flex  items-center gap-10 justify-center">
        <Button onClick={() => handlePages("-")} disabled={pages.start === 1}>
          <p>Previous Page</p>
        </Button>
        <p className="text-light-1">{count}</p>
        <Button onClick={() => handlePages("+")} disabled={pages.end >= count}>
          <p>Next Page</p>
        </Button>
      </div>
    </>
  );
}

export default SingleRecipeSearch;
