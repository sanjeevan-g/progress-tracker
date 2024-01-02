import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {

  title: "Progress Tracker",
  description: "Personal Blog and learning Tracker "

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-2xl mb-40 flex flex-col mx-4 mt-8 md:mx-auto md:mt-12 min-h-screen bg-zinc-200 dark:bg-dark`}>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
