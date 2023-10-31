'use client'
import supabase from "@/lib/supabase";
import Searchcourse from "../my-components/searchcourse";
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Play } from "lucide-react";

// Define the type for a course
interface Course {
  id: number;
  title: string;
  description: string;
  ects: number;
  eka: string;
}

export const dynamic = "force-dynamic";

export default function Course() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const { data: course, error } = await supabase.from("courses").select();
        if (error) {
          throw error;
        }
        setCourses(course || []);
        setFilteredCourses(course || []); // Initially, display all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  const handleSearch = (searchQuery: string) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <Searchcourse onSearch={handleSearch} />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">

        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle className="w-fit">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="mb-auto">
                <p>{course.ects} ECTS <br></br>EKA: {course.eka}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="mr-2">
                  <Link href={'courses/'+course.eka}>Start preparing</Link>
                </Button>
                <Button className="bg-yellow-600">
                  Favorite <Star className="ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
}