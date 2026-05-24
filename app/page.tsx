import { Suspense } from 'react'
import { HomePage } from '@/components/home-page'

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-12 text-sm text-zinc-500">Loading…</div>}>
      <HomePage />
    </Suspense>
  )
}
