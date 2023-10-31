'use client'
import supabase from "@/lib/supabase"; 
import React, { useEffect, useState } from "react";

interface Content {
  id: number;
  bodytext: string;
  created_at: Date;
}

export default function Page({ params }: { params: { course: string } }) {
  const [content, setContent] = useState<Content[]>([]);
  useEffect(() => {
    async function fetchContent() {
      try {
        const { data: content, error } = await supabase.from("content").select();
        if (error) {
          throw error;
        }
        setContent(content || []);
        console.log(content)
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }
    fetchContent();
  }, []);
  const courseID = params.course;
  return (
  <div>
    My Post: {params.course}
    {content.map((content) => (
      <p key={content.id}>{content.bodytext}</p>
    ))}
  </div>
    )
}
