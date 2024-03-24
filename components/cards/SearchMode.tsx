"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
interface Props {
  label: string;
  mode: string;
}
const SearchMode = ({ label, mode }: Props) => {
  const router = useRouter();
  return (
    <Button
      className="user-card_btn"
      onClick={() => router.push(`/search/${mode}`)}
    >
      {label}
    </Button>
  );
};

export default SearchMode;
