"use client"

import { NoPostFound } from "@/components/NoPostFound";
import { SearchBar } from "@/components/SearchBar";
import { Post, allPosts } from "contentlayer/generated";
import Link from "next/link";
import { useState } from "react";


export default function Page() {

    const [query, setQuery] = useState<string>("");

    let postData: Post[] = allPosts.filter(post => {
        return query.length < 3 || post.title.toLowerCase().includes(query.toLowerCase()) || post.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
    });

    return <section>
        <h1 className="font-medium text-2xl text-white mb-8">
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
        <div className="flex flex-col">
            <p className="text-white text-xl"> {post.title} </p>
            {post.tags
                ?
                <ul className="flex gap-x-2">
                    {post.tags.map((tag: string) => (
                        <li className="text-sm text-neutral-400" key={tag}>{`#${tag}`} </li>
                    ))}
                </ul>
                : ""
            }
        </div>
    </Link>
}