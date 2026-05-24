import { Post } from 'contentlayer/generated'

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

export function getPopularPosts(posts: Post[], limit = 5): Post[] {
  return [...posts]
    .filter(p => p.featured && getPopularityScore(p) > 0)
    .sort((a, b) => getPopularityScore(b) - getPopularityScore(a))
    .slice(0, limit)
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
