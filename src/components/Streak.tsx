import { Post } from '.contentlayer/generated'
import { compareAsc, compareDesc, differenceInCalendarDays, parseISO } from 'date-fns';

export default function Streak({ posts }: { posts: Post[] }) {
    let maxStreak = calculateMaxStreak(posts);
    let currentStreak = calculateCurrentStreak(posts);
    return (
        // <div>Max Streak: {maxStreak} {currentStreak}</div>
        <div className='flex flex-wrap gap-4 justify-around text-3xl text-orange-700 dark:text-orange-400'>
            <p>Current Streak: <span className='font-semibold'>{currentStreak}</span></p>
            <p> Max Streak: <span className='font-semibold'>{maxStreak}</span> </p>
        </div>
    )
}

function calculateMaxStreak(posts: Post[]): number {
    if (posts.length === 0) return 0;
    let res = 1;
    let max = 1;

    let sortedPosts = sortPosts(posts , "asc");

    for (let i = 1; i < sortedPosts.length; i++) {
        let diff = Math.abs(differenceInCalendarDays(parseISO(sortedPosts[i - 1].publishedAt), parseISO(sortedPosts[i].publishedAt)));
        if (diff > 1) { // broke the streak
            res = 1;
        } else if (diff == 1) { // streak coontinues
            res++;
        }
        max = Math.max(res, max);
    }

    return max;
}

function calculateCurrentStreak(posts: Post[]): number {
    let sortedPosts = sortPosts(posts , "desc");
    if (sortedPosts.length === 0 || differenceInCalendarDays(new Date(), parseISO(sortedPosts[0].publishedAt)) > 1) return 0;

    let res = 1;

    for (let i = 1; i < sortedPosts.length; i++) {
        let diff = differenceInCalendarDays(parseISO(sortedPosts[i - 1].publishedAt), parseISO(sortedPosts[i].publishedAt))
        if (diff > 1) break;
        else if (diff === 1) res++;
    }

    return res;
}

function sortPosts(posts: Post[], order : "asc" | "desc"): Post[] {

    if(order === "asc") {
        return posts.slice().sort((a, b) => compareAsc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
    }

    return posts.slice().sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)));
}
