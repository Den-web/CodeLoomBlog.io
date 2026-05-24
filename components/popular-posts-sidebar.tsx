import { Post } from 'contentlayer/generated'
import { LinkedInPostCard } from '@/components/linkedin-post-card'
import { getPopularPosts } from '@/lib/posts'

interface PopularPostsSidebarProps {
  posts: Post[]
  onViewAllLinkedIn?: () => void
}

export function PopularPostsSidebar({ posts, onViewAllLinkedIn }: PopularPostsSidebarProps) {
  const popular = getPopularPosts(posts, 4)

  if (!popular.length) {
    return null
  }

  return (
    <aside className="w-64 shrink-0 pl-6 pt-12 border-l border-zinc-100 dark:border-zinc-800/80">
      <section>
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Popular on LinkedIn
          </h2>
          {onViewAllLinkedIn && (
            <button
              type="button"
              onClick={onViewAllLinkedIn}
              className="text-[10px] text-pink-600 dark:text-pink-400 hover:underline shrink-0"
            >
              All →
            </button>
          )}
        </div>
        <ul className="space-y-3">
          {popular.map(post => (
            <li key={post._id}>
              <LinkedInPostCard post={post} variant="compact" />
            </li>
          ))}
        </ul>
        {onViewAllLinkedIn && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
            Proof of reach — reactions, comments, discovery.{' '}
            <button
              type="button"
              onClick={onViewAllLinkedIn}
              className="text-pink-600 dark:text-pink-400 hover:underline"
            >
              Open LinkedIn topic
            </button>
          </p>
        )}
      </section>
    </aside>
  )
}
