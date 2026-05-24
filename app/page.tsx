'use client'

import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { PopularPostsSidebar } from '@/components/popular-posts-sidebar'
import { PostPagination } from '@/components/post-pagination'
import { TopicsNav } from '@/components/topics-nav'
import { useEffect, useMemo, useState } from 'react'
import {
  ORCHESTRAI_TOPIC,
  filterPostsByTopic,
  formatLinkedInStats,
  paginatePosts,
  sortPostsForHome,
} from '@/lib/posts'

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const sortedPosts = useMemo(() => sortPostsForHome(allPosts), [])

  const filteredPosts = useMemo(
    () => filterPostsByTopic(sortedPosts, selectedTopic),
    [sortedPosts, selectedTopic]
  )

  const pagination = useMemo(() => paginatePosts(filteredPosts, page), [filteredPosts, page])

  useEffect(() => {
    setPage(1)
  }, [selectedTopic])

  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic)
  }

  return (
    <div className="flex gap-0 max-w-7xl mx-auto w-full">
      <TopicsNav posts={allPosts} selectedTopic={selectedTopic} onTopicSelect={handleTopicSelect} />

      <div className="flex-1 min-w-0 px-6 pt-12 prose prose-h2:no-underline dark:prose-invert">
        {selectedTopic === ORCHESTRAI_TOPIC && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 not-prose mb-6 -mt-2">
            Build-in-public: AI architecture for OrchestrAI (Instagram DM → order).
          </p>
        )}

        {pagination.items.length === 0 ? (
          <p className="text-zinc-500 not-prose">No posts in this topic yet.</p>
        ) : (
          pagination.items.map(post => {
            const stats = formatLinkedInStats(post)
            return (
              <article className="prose-h2:mb-0 prose-p:mt-0 mb-8" key={post._id}>
                {post.featured && (
                  <span className="inline-block text-xs font-medium uppercase tracking-wide text-pink-600 dark:text-pink-400 mb-1 not-prose">
                    {post.blogFirst ? 'OrchestrAI series' : 'Popular'}
                  </span>
                )}
                <Link className="no-underline" href={post.slug}>
                  <h2>{post.title}</h2>
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
                  <div className="flex flex-wrap gap-2 mt-2 not-prose">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-sm text-pink-500 dark:text-pink-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )
          })
        )}

        <PostPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          start={pagination.start}
          end={pagination.end}
          onPageChange={setPage}
        />
      </div>

      <PopularPostsSidebar posts={allPosts} />
    </div>
  )
}
