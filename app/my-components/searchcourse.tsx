'use client'
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface SearchCourseProps {
  onSearch: (searchQuery: string) => void;
}

export default function Searchcourse({ onSearch }: SearchCourseProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex mb-10 justify-center">
      <Input
        className="flex w-1/2"
        type="search"
        placeholder="Course"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value); // Trigger search on every keypress
        }}
      />
    </div>
  );
}