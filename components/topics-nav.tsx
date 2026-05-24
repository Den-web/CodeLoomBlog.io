'use client'

import { Post } from 'contentlayer/generated'
import { ORCHESTRAI_TOPIC, countPostsForTopic, getTopicList } from '@/lib/posts'

interface TopicsNavProps {
  posts: Post[]
  selectedTopic: string | null
  onTopicSelect: (topic: string | null) => void
}

export function TopicsNav({ posts, selectedTopic, onTopicSelect }: TopicsNavProps) {
  const { orchestraiCount, tags } = getTopicList(posts)
  const totalCount = posts.length

  const itemClass = (active: boolean) =>
    `flex justify-between items-center w-full text-left py-1 px-2 rounded transition-colors ${
      active ? 'bg-pink-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }`

  const labelClass = (active: boolean) =>
    active
      ? 'text-white'
      : 'text-pink-500 hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300'

  return (
    <aside className="w-52 shrink-0 pr-6 pt-12 border-r border-zinc-100 dark:border-zinc-800/80">
      <nav>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-3">
          Topics
        </h2>
        <ul className="space-y-2">
          <li>
            <button
              type="button"
              onClick={() => onTopicSelect(null)}
              className={itemClass(selectedTopic === null)}
            >
              <span className={labelClass(selectedTopic === null)}>All posts</span>
              <span className={selectedTopic === null ? 'text-white' : 'text-gray-500'}>
                ({totalCount})
              </span>
            </button>
          </li>

          {orchestraiCount > 0 && (
            <li>
              <button
                type="button"
                onClick={() =>
                  onTopicSelect(selectedTopic === ORCHESTRAI_TOPIC ? null : ORCHESTRAI_TOPIC)
                }
                className={itemClass(selectedTopic === ORCHESTRAI_TOPIC)}
              >
                <span className={labelClass(selectedTopic === ORCHESTRAI_TOPIC)}>OrchestrAI</span>
                <span
                  className={selectedTopic === ORCHESTRAI_TOPIC ? 'text-white' : 'text-gray-500'}
                >
                  ({orchestraiCount})
                </span>
              </button>
            </li>
          )}

          {tags.map(tag => (
            <li key={tag}>
              <button
                type="button"
                onClick={() => onTopicSelect(selectedTopic === tag ? null : tag)}
                className={itemClass(selectedTopic === tag)}
              >
                <span className={labelClass(selectedTopic === tag)}>{tag.toUpperCase()}</span>
                <span className={selectedTopic === tag ? 'text-white' : 'text-gray-500'}>
                  ({countPostsForTopic(posts, tag)})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
