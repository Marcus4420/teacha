'use client'
import supabase from "@/lib/supabase"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Star, Play} from "lucide-react";
  import React, { useEffect, useState } from 'react';
  

// Define the type for a course
interface Course {
    id: number;
    title: string;
    description: string;
    ects: number;
    eka: string;
  }
  
  export const dynamic = 'force-dynamic';
  
  export default function Course() {
    const [courses, setCourses] = useState<Course[]>([]); // Provide the type annotation here
  
    useEffect(() => {
      // Inside the useEffect, fetch data from Supabase when the component mounts
      async function fetchCourses() {
        try {
          const { data: course, error } = await supabase.from('courses').select();
          if (error) {
            throw error;
          }
          setCourses(course || []); // Use an empty array as the default if data is null
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
  
      // Call the fetchCourses function
      fetchCourses();
    }, []); // The empty dependency array ensures this effect runs only on mount
  
    return (
      <div className="grid gap-4 grid-cols-3 grid-rows-3">
        {courses.map(course => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="w-fit">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {course.eka} - {course.ects} ECTS-point
              </p>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">
                Start preparing <Play className="ml-1" />
              </Button>
              <Button className="bg-yellow-600">
                Favorite <Star className="ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }