import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { parseISO } from "date-fns";
import format from "date-fns/format";

type Params = { params: { slug: string } }

export function generateStaticParams() {
    return allPosts.map(post => ({
        slug: post.url
    }))
}


export function generateMetadata({ params }: Params): Metadata {
    let post = allPosts.find(post => post.url === params.slug);

    if (!post) {
        return {
            title: "Post not found",
        }
    }
    return {
        title: post.title
    }
}


export default function Page({ params }: Params) {

    //find the specific post
    let post = allPosts.find(post => post.url === params.slug);
    if (!post) {
        notFound();
    }
    const MDXContent = useMDXComponent(post.body.code)

    let dateFormat = format(new Date(post.publishedAt), 'yyyy-MM-dd')

    return <section>
        <Link href="/posts" className="inline-flex gap-x-2 items-center font-medium text-2xl transition-all hover:text-neutral-700 dark:hover:text-neutral-200 hover:no-underline">
            <BsArrowLeft /> Back
        </Link>

        <h1 className="mt-10 mb-2 text-4xl font-semibold">
            {post.title}
        </h1>
        <p className="capitalize dark:text-neutral-200 text-neutral-700 text-lg ">published on : <span className="font-medium">{dateFormat}</span></p>
        {
            post.tags &&
            <ul className="flex flex-wrap gap-2 mt-5">
                {post.tags.map((tag) => <li className="font-medium text-sm" key={tag}> #{tag}</li>)}
            </ul>
        }

        <div className="prose prose-neutral dark:prose-invert mt-10 prose-code:after:hidden prose-code:before:hidden">
            <MDXContent />
        </div>

    </section>
}