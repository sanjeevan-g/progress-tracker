import React from 'react'

export default function Navbar() {
    return (
        <nav className='flex gap-3 mb-8 capitalize'>
            <a href="/" className='transition-all hover:text-neutral-200'>
                <span className='py-1'>home</span>
            </a>
            <a href="/posts" className='transition-all hover:text-neutral-200'>
                <span className='py-1'>posts</span>
            </a>
        </nav>
    )
}
