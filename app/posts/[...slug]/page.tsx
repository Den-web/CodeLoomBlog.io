import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { MdxWrapper } from '@/components/mdx-wrapper'
import { format } from 'date-fns'
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug?.join('/')
  const post = allPosts.find(post => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map(post => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const readingTime = Math.ceil(post.body.raw.split(/\s+/).length / 200) // Assuming 200 words per minute

  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">{post.description}</p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={post.date}>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>
          {post.tags && (
            <div className="flex items-center gap-2 flex-wrap">
              <TagIcon className="w-4 h-4" />
              <div className="flex gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <MdxWrapper code={post.body.code} />

      {/* Footer Section */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Last updated: {format(new Date(post.date), 'MMMM d, yyyy')}
          </div>
          <div className="flex gap-4">{/* Add social share buttons or other actions here */}</div>
        </div>
      </div>
    </article>
  )
}
