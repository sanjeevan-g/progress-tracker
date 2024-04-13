"use client"

import { NoPostFound } from "@/components/NoPostFound";
import { SearchBar } from "@/components/SearchBar";
import { Post, allPosts } from "contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";
import Link from "next/link";
import { useState } from "react";


export default function Page() {

    const [query, setQuery] = useState<string>("");

    let postData: Post[] = allPosts.filter(post => {
        const searchQuery = query.trim();
        return searchQuery.length < 3 || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    postData.sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))

    return <section>
        <h1 className="font-medium text-2xl  mb-8">
            Recent Posts
        </h1>
        <SearchBar query={query} setQuery={setQuery} />
        {postData.length > 0 ?
            <div className="flex flex-col gap-y-5 mt-7">
                {postData.map((post: Post) => (
                    <PostComp key={post._id} post={post} />
                ))}
            </div>
            :
            <NoPostFound />}
    </section>
}

function PostComp({ post }: { post: Post }) {

    return <Link href={`posts/${post.url}`} className="flex">
        <article>
            <p className=" text-xl"> {post.title} </p>
            <p className="my-1 italic text-neutral-700  dark:text-zinc-200">{new Date(post.publishedAt).toLocaleDateString("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}</p>
            {post.tags
                ?
                <ul className="flex gap-x-2 flex-wrap">
                    {post.tags.map((tag: string) => (
                        <li className="text-sm text-neutral-700 dark:text-neutral-400" key={tag}>{`#${tag}`} </li>
                    ))}
                </ul>
                : ""
            }
        </article>
    </Link>
}