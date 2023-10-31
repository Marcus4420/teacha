'use client'
 
import { usePathname } from 'next/navigation'
 
export default function ExampleClientComponent({ params }: { params: { course: string } }) {
  const pathname = usePathname()
  const subPathIndexStart = pathname.indexOf('/', 2);
  const subPath = pathname.substring(subPathIndexStart+1, pathname.length);
  console.log(subPath);
  return <p>{subPath}</p>
}
