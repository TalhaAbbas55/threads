"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { allIngredients } from "@/constants";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import page from "@/app/(root)/activity/page";

interface Props {
  routeType: string;
  placeholder: string;
  count: number;
}

interface Ingredient {
  label: string;
  value: string;
}

function RecipeSearch({ routeType, placeholder, count }: Props) {
  const router = useRouter();

  const [pages, setPages] = useState<{
    start: number;
    end: number;
  }>({
    start: 1,
    end: 10,
  });
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  // / query after 0.3s of no input
  const handleSearch = (pagesParam: { start: number; end: number }) => {
    const delayDebounceFn = setTimeout(() => {
      if (selectedIngredients.length > 0) {
        const allIngredients = selectedIngredients
          .map((ingredient) => ingredient.value)
          .join(",");
        router.push(
          `/search/IngredientsBased?q=${encodeURIComponent(
            allIngredients
          )}&start=${pagesParam.start}&end=${pagesParam.end}`
        );
      } else {
        router.push(`/search/IngredientsBased`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  };
  const handleIngredientChange = (newValue: Ingredient[]) => {
    setSelectedIngredients(newValue);
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
      </div>
      <CreatableSelect
        isClearable
        options={allIngredients}
        isMulti
        value={selectedIngredients}
        onChange={handleIngredientChange}
        // inputValue={search}
      />

      <Button
        size="sm"
        className="community-card_btn"
        onClick={() => handleSearch(pages)}
      >
        Search
      </Button>
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

export default RecipeSearch;
