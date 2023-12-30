import Streak from "@/components/Streak";
import { allPosts } from "contentlayer/generated";

export const revalidate = 3600;

export default function Home() {

  return (
    <section>
      <h1 className='font-medium text-2xl mb-10'>
        Hi! I&apos;m Sanjeevan 🙋‍♂️
      </h1>
      <p className='mb-3'>
        I have create this blog to post my learnings and stuffs.
      </p>
      <p className='mb-3'>
        In this blog, i have added <em className='font-semibold'> streak tracker </em> to track my progress.
        it helps to have <em className='font-semibold'>consistency </em> in this process.
      </p>
      <div className="mt-5 text-center">
        <Streak posts={allPosts}/>
      </div>
    </section>
  )
}
