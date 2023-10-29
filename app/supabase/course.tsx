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
    const [courses, setCourses] = useState<Course[]>([]);
  
    useEffect(() => {
      async function fetchCourses() {
        try {
          const { data: course, error } = await supabase.from('courses').select();
          if (error) {
            throw error;
          }
          setCourses(course || []);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      }
  
      fetchCourses();
    }, []);
  
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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