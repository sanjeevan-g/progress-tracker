import type { Metadata } from 'next'


export const metadata: Metadata = {

    title: "Progress Tracker",
    description: "Personal Blog and learning Tracker "

}

export default function PostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}