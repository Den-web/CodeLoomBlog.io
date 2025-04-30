'use client'

import { Analytics } from '@vercel/analytics/react'

export function AnalyticsWrapper() {
  return (
    <Analytics
      mode="auto"
      debug={false}
      beforeSend={(event) => {
        if ('url' in event) {
          return {
            ...event,
            url: event.url.split('?')[0]
          }
        }
        return event
      }}
    />
  )
} 