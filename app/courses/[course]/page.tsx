export default function Page({ params }: { params: { course: string } }) {
  return <div>My Post: {params.course}</div>
}