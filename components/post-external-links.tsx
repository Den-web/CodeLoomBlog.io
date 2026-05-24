import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import { formatLinkedInStats, isLinkedInMirrorPost } from '@/lib/posts'

interface PostExternalLinksProps {
  post: Post
}

export function PostExternalLinks({ post }: PostExternalLinksProps) {
  const linkedInStats = formatLinkedInStats(post)
  const hasLinks = post.linkedinUrl || post.instagramUrl

  if (!hasLinks && !post.blogFirst) {
    return null
  }

  const linkedinMirror = isLinkedInMirrorPost(post)

  return (
    <div className="mb-8 space-y-3">
      {linkedinMirror && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Part of the{' '}
          <Link
            href="/?topic=linkedin"
            className="text-pink-600 dark:text-pink-400 hover:underline"
          >
            LinkedIn
          </Link>{' '}
          topic — expanded mirror; engagement lives on the original post below.
        </p>
      )}

      {post.blogFirst && post.series && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
          <strong>Build in public.</strong> Ця стаття з&apos;явилась на блозі раніше за LinkedIn —
          коли OrchestrAI вийде в публічний доступ, опублікуємо серію і в стрічці.
        </div>
      )}

      {post.linkedinUrl && (
        <a
          href={post.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40 px-4 py-3 hover:border-sky-400 transition-colors"
        >
          <span className="text-sm font-medium text-sky-900 dark:text-sky-100">
            Discussion on LinkedIn
            {linkedInStats ? ` · ${linkedInStats}` : ''}
          </span>
          <span className="text-sm text-sky-700 dark:text-sky-300 shrink-0">Open post →</span>
        </a>
      )}

      {post.instagramUrl && (
        <a
          href={post.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-fuchsia-200 bg-fuchsia-50 dark:border-fuchsia-900 dark:bg-fuchsia-950/40 px-4 py-3 hover:border-fuchsia-400 transition-colors"
        >
          <span className="text-sm font-medium text-fuchsia-900 dark:text-fuchsia-100">
            OrchestrAI · Instagram context
          </span>
          <span className="text-sm text-fuchsia-700 dark:text-fuchsia-300 shrink-0">Open →</span>
        </a>
      )}
    </div>
  )
}
