import { Post } from 'contentlayer/generated'
import { PopularPosts } from '@/components/popular-posts'

interface SidebarProps {
  posts: Post[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
}

export default function Sidebar({ posts, selectedTag, onTagSelect }: SidebarProps) {
  const tags = Array.from(new Set(posts.flatMap(post => post.tags ?? [])))

  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag] = posts.filter(post => post.tags?.includes(tag)).length
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <aside className="w-64 pl-8 pt-12 shrink-0 border-l border-zinc-100 dark:border-zinc-800/80">
      <PopularPosts posts={posts} />

      {tags.length > 0 && (
        <nav>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-3">
            Topics
          </h2>
          <ul className="space-y-2">
            {tags.map(tag => (
              <li key={tag}>
                <button
                  onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                  className={`flex justify-between items-center w-full text-left py-1 px-2 rounded transition-colors ${
                    selectedTag === tag
                      ? 'bg-pink-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span
                    className={`${
                      selectedTag === tag
                        ? 'text-white'
                        : 'text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300'
                    }`}
                  >
                    {tag.toUpperCase()}
                  </span>
                  <span className={`${selectedTag === tag ? 'text-white' : 'text-gray-500'}`}>
                    ({tagCounts[tag]})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  )
}
