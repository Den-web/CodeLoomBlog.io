import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import { formatLinkedInStats, getPopularPosts } from '@/lib/posts'

interface PopularPostsSidebarProps {
  posts: Post[]
  title?: string
}

export function PopularPostsSidebar({
  posts,
  title = 'Popular on LinkedIn',
}: PopularPostsSidebarProps) {
  const popular = getPopularPosts(posts)

  if (!popular.length) {
    return null
  }

  return (
    <aside className="w-64 shrink-0 pl-6 pt-12 border-l border-zinc-100 dark:border-zinc-800/80">
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-3">
          {title}
        </h2>
        <ul className="space-y-3">
          {popular.map(post => {
            const stats = formatLinkedInStats(post)
            return (
              <li key={post._id}>
                <Link
                  href={post.slug}
                  className="block text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:text-pink-600 dark:hover:text-pink-400 leading-snug"
                >
                  {post.title}
                </Link>
                {stats && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{stats}</p>
                )}
                {post.linkedinUrl && (
                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pink-600 dark:text-pink-400 hover:underline mt-0.5 inline-block"
                  >
                    View on LinkedIn →
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}
