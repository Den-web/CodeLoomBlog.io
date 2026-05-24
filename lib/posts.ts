import { Post } from 'contentlayer/generated'

export const ORCHESTRAI_TOPIC = 'ORCHESTRAI'
export const LINKEDIN_TOPIC = 'LINKEDIN'
export const POSTS_PER_PAGE = 10

export function isOrchestraiPost(post: Post): boolean {
  return post.series === 'orchestrai' || (post.tags?.includes(ORCHESTRAI_TOPIC) ?? false)
}

/** Mirrors of LinkedIn posts — linked original + engagement metrics on the blog. */
export function isLinkedInMirrorPost(post: Post): boolean {
  if (post.blogFirst) {
    return false
  }
  if (post.linkedinMirror) {
    return true
  }
  return Boolean(post.linkedinUrl)
}

export function getPopularityScore(post: Post): number {
  if (post.popularityScore && post.popularityScore > 0) {
    return post.popularityScore
  }
  if (post.linkedinReactions) {
    return post.linkedinReactions
  }
  return 0
}

export function sortPostsForHome(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0
    const bFeatured = b.featured ? 1 : 0
    if (aFeatured !== bFeatured) {
      return bFeatured - aFeatured
    }
    const popDiff = getPopularityScore(b) - getPopularityScore(a)
    if (popDiff !== 0) {
      return popDiff
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function sortOrchestraiPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const orderDiff = (a.seriesOrder ?? 99) - (b.seriesOrder ?? 99)
    if (orderDiff !== 0) {
      return orderDiff
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function sortLinkedInMirrorPosts(posts: Post[]): Post[] {
  return [...posts]
    .filter(isLinkedInMirrorPost)
    .sort((a, b) => getPopularityScore(b) - getPopularityScore(a))
}

export function filterPostsByTopic(posts: Post[], topic: string | null): Post[] {
  if (!topic) {
    return posts
  }
  if (topic === ORCHESTRAI_TOPIC) {
    return sortOrchestraiPosts(posts.filter(isOrchestraiPost))
  }
  if (topic === LINKEDIN_TOPIC) {
    return sortLinkedInMirrorPosts(posts)
  }
  return posts.filter(post => post.tags?.includes(topic))
}

export function paginatePosts<T>(items: T[], page: number, perPage: number = POSTS_PER_PAGE) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalItems: items.length,
    start: items.length ? start + 1 : 0,
    end: Math.min(start + perPage, items.length),
  }
}

const RESERVED_TAGS = new Set([ORCHESTRAI_TOPIC, LINKEDIN_TOPIC])

export function getTopicList(posts: Post[]): {
  orchestraiCount: number
  linkedinCount: number
  tags: string[]
} {
  const tagSet = new Set<string>()
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      if (!RESERVED_TAGS.has(tag)) {
        tagSet.add(tag)
      }
    }
  }
  const tags = Array.from(tagSet).sort((a, b) => a.localeCompare(b))
  return {
    orchestraiCount: posts.filter(isOrchestraiPost).length,
    linkedinCount: posts.filter(isLinkedInMirrorPost).length,
    tags,
  }
}

export function countPostsForTopic(posts: Post[], topic: string): number {
  if (topic === ORCHESTRAI_TOPIC) {
    return posts.filter(isOrchestraiPost).length
  }
  if (topic === LINKEDIN_TOPIC) {
    return posts.filter(isLinkedInMirrorPost).length
  }
  return posts.filter(post => post.tags?.includes(topic)).length
}

export function getPopularPosts(posts: Post[], limit = 5): Post[] {
  return sortLinkedInMirrorPosts(posts).slice(0, limit)
}

export function formatLinkedInStats(post: Post): string | null {
  const parts: string[] = []
  if (post.linkedinReactions) {
    parts.push(`${post.linkedinReactions} reactions`)
  }
  if (post.linkedinComments) {
    parts.push(`${post.linkedinComments} comments`)
  }
  if (post.linkedinDiscovery) {
    parts.push(`${post.linkedinDiscovery} discovery`)
  }
  return parts.length ? parts.join(' · ') : null
}
