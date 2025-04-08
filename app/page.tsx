'use client'

import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? allPosts.filter(post => post.tags?.includes(selectedTag))
    : allPosts

  return (
    <div className="flex">
      <Sidebar posts={allPosts} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      <div className="flex-1 prose prose-he:no-underline dark:prose-invert">
        {filteredPosts.map(post => (
          <article className="prose-h2:mb-0 prose-p:mt-0" key={post._id}>
            <Link className="no-underline" href={post.slug}>
              <h2 className="">{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-sm text-pink-500 dark:text-pink-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
