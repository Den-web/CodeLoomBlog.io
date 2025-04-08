import { track } from '@vercel/analytics'

// Track page views with custom data
export const trackPageView = (url: string, additionalData = {}) => {
  track('pageview', {
    url,
    ...additionalData,
  })
}

// Track blog post views
export const trackPostView = (postTitle: string, postId: string) => {
  track('post_view', {
    title: postTitle,
    id: postId,
    timestamp: new Date().toISOString(),
  })
}

// Track user interactions
export const trackInteraction = (action: string, element: string, additionalData = {}) => {
  track('interaction', {
    action,
    element,
    timestamp: new Date().toISOString(),
    ...additionalData,
  })
}

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  track('search', {
    query,
    resultsCount,
    timestamp: new Date().toISOString(),
  })
}

// Track error events
export const trackError = (error: Error, componentName: string) => {
  track('error', {
    message: error.message,
    component: componentName,
    stack: error.stack || '',
    timestamp: new Date().toISOString(),
  })
}
