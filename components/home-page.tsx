'use client'

import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { LinkedInPostCard } from '@/components/linkedin-post-card'
import { PopularPostsSidebar } from '@/components/popular-posts-sidebar'
import { PostPagination } from '@/components/post-pagination'
import { TopicsNav } from '@/components/topics-nav'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  LINKEDIN_TOPIC,
  ORCHESTRAI_TOPIC,
  filterPostsByTopic,
  formatLinkedInStats,
  isLinkedInMirrorPost,
  paginatePosts,
  sortPostsForHome,
} from '@/lib/posts'

const TOPIC_FROM_QUERY: Record<string, string> = {
  linkedin: LINKEDIN_TOPIC,
  orchestrai: ORCHESTRAI_TOPIC,
}

const QUERY_FROM_TOPIC: Partial<Record<string, string>> = {
  [LINKEDIN_TOPIC]: 'linkedin',
  [ORCHESTRAI_TOPIC]: 'orchestrai',
}

export function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const q = searchParams.get('topic')
    if (q && TOPIC_FROM_QUERY[q]) {
      setSelectedTopic(TOPIC_FROM_QUERY[q])
    } else if (!q) {
      setSelectedTopic(null)
    }
  }, [searchParams])

  const sortedPosts = useMemo(() => sortPostsForHome(allPosts), [])

  const filteredPosts = useMemo(
    () => filterPostsByTopic(sortedPosts, selectedTopic),
    [sortedPosts, selectedTopic]
  )

  const pagination = useMemo(() => paginatePosts(filteredPosts, page), [filteredPosts, page])

  useEffect(() => {
    setPage(1)
  }, [selectedTopic])

  const selectTopic = (topic: string | null) => {
    setSelectedTopic(topic)
    const slug = topic ? QUERY_FROM_TOPIC[topic] : null
    const next = slug ? `/?topic=${slug}` : '/'
    router.replace(next, { scroll: false })
  }

  const isLinkedInView = selectedTopic === LINKEDIN_TOPIC

  return (
    <div className="flex gap-0 max-w-7xl mx-auto w-full">
      <TopicsNav posts={allPosts} selectedTopic={selectedTopic} onTopicSelect={selectTopic} />

      <div className="flex-1 min-w-0 px-6 pt-12">
        {isLinkedInView && (
          <header className="mb-8 not-prose">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              LinkedIn
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Mirrors of posts that performed in the feed — reactions, comments, discovery. Each
              card links to the <strong>original on LinkedIn</strong> and an expanded write-up here
              on Code Loom.
            </p>
          </header>
        )}

        {selectedTopic === ORCHESTRAI_TOPIC && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 not-prose mb-6">
            Build-in-public: AI architecture for OrchestrAI (Instagram DM → order).
          </p>
        )}

        {pagination.items.length === 0 ? (
          <p className="text-zinc-500 not-prose">No posts in this topic yet.</p>
        ) : isLinkedInView ? (
          <ul className="space-y-4 not-prose">
            {pagination.items.map(post => (
              <li key={post._id}>
                <LinkedInPostCard post={post} variant="featured" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="prose prose-h2:no-underline dark:prose-invert">
            {pagination.items.map(post => {
              const stats = formatLinkedInStats(post)
              const linkedinMirror = isLinkedInMirrorPost(post)
              return (
                <article className="prose-h2:mb-0 prose-p:mt-0 mb-8" key={post._id}>
                  {post.featured && (
                    <span className="inline-block text-xs font-medium uppercase tracking-wide text-pink-600 dark:text-pink-400 mb-1 not-prose">
                      {post.blogFirst
                        ? 'OrchestrAI series'
                        : linkedinMirror
                          ? 'LinkedIn'
                          : 'Popular'}
                    </span>
                  )}
                  <Link className="no-underline" href={post.slug}>
                    <h2>{post.title}</h2>
                  </Link>
                  {post.description && <p>{post.description}</p>}
                  {linkedinMirror && stats && (
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
                            original post
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
                      {post.tags
                        .filter((tag: string) => tag !== 'LINKEDIN')
                        .map((tag: string) => (
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

      <PopularPostsSidebar posts={allPosts} onViewAllLinkedIn={() => selectTopic(LINKEDIN_TOPIC)} />
    </div>
  )
}
