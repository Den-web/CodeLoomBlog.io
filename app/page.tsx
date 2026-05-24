'use client'

import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import Sidebar from './components/Sidebar'
import { useMemo, useState } from 'react'
import { formatLinkedInStats, sortPostsForHome } from '@/lib/posts'

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const sortedPosts = useMemo(() => sortPostsForHome(allPosts), [])

  const filteredPosts = selectedTag
    ? sortedPosts.filter(post => post.tags?.includes(selectedTag))
    : sortedPosts

  return (
    <div className="flex max-w-5xl mx-auto">
      <div className="flex-1 min-w-0 prose prose-h2:no-underline dark:prose-invert pr-4">
        {filteredPosts.map(post => {
          const stats = formatLinkedInStats(post)
          return (
            <article className="prose-h2:mb-0 prose-p:mt-0 mb-8" key={post._id}>
              {post.featured && (
                <span className="inline-block text-xs font-medium uppercase tracking-wide text-pink-600 dark:text-pink-400 mb-1 not-prose">
                  {post.blogFirst ? 'OrchestrAI series' : 'Popular'}
                </span>
              )}
              <Link className="no-underline" href={post.slug}>
                <h2 className="">{post.title}</h2>
              </Link>
              {post.description && <p>{post.description}</p>}
              {stats && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 not-prose">
                  LinkedIn: {stats}
                  {post.linkedinUrl && (
                    <>
                      {' · '}
                      <a
                        href={post.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 dark:text-pink-400 hover:underline"
                      >
                        open post
                      </a>
                    </>
                  )}
                </p>
              )}
              {post.series && post.blogFirst && (
                <p className="text-sm text-amber-700 dark:text-amber-300 not-prose">
                  Part {post.seriesOrder} — blog first, LinkedIn when we launch
                </p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mt-2 not-prose">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="text-sm text-pink-500 dark:text-pink-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
      <Sidebar posts={allPosts} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
    </div>
  )
}
