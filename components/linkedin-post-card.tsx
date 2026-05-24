import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import { formatLinkedInStats } from '@/lib/posts'

interface LinkedInPostCardProps {
  post: Post
  variant?: 'compact' | 'featured'
}

export function LinkedInPostCard({ post, variant = 'compact' }: LinkedInPostCardProps) {
  const stats = formatLinkedInStats(post)
  const isFeatured = variant === 'featured'

  return (
    <article
      className={`rounded-lg border transition-colors ${
        isFeatured
          ? 'border-sky-200 bg-sky-50/80 dark:border-sky-900 dark:bg-sky-950/30 p-5'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-pink-800 p-4'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
          LinkedIn
        </span>
        {stats && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0 text-right">
            {stats}
          </span>
        )}
      </div>

      <Link
        href={post.slug}
        className={`block font-medium text-zinc-900 dark:text-zinc-50 hover:text-pink-600 dark:hover:text-pink-400 ${
          isFeatured ? 'text-lg leading-snug mb-2' : 'text-sm leading-snug'
        }`}
      >
        {post.title}
      </Link>

      {post.description && (
        <p
          className={`text-zinc-600 dark:text-zinc-400 ${
            isFeatured ? 'text-sm mb-4' : 'text-xs mt-1 mb-2 line-clamp-3'
          }`}
        >
          {post.description}
        </p>
      )}

      <div className={`flex flex-wrap gap-x-4 gap-y-1 ${isFeatured ? 'text-sm' : 'text-xs'}`}>
        <Link
          href={post.slug}
          className="text-pink-600 dark:text-pink-400 font-medium hover:underline"
        >
          Expanded on blog →
        </Link>
        {post.linkedinUrl && (
          <a
            href={post.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 dark:text-sky-300 hover:underline"
          >
            Original post on LinkedIn →
          </a>
        )}
      </div>
    </article>
  )
}
