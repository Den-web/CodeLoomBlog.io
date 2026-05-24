'use client'

interface PostPaginationProps {
  page: number
  totalPages: number
  totalItems: number
  start: number
  end: number
  onPageChange: (page: number) => void
}

export function PostPagination({
  page,
  totalPages,
  totalItems,
  start,
  end,
  onPageChange,
}: PostPaginationProps) {
  if (totalItems <= 0) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 not-prose"
      aria-label="Pagination"
    >
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Showing {start}–{end} of {totalItems}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1.5 text-sm rounded border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          Previous
        </button>

        {pages.map(p => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`min-w-[2.25rem] px-2 py-1.5 text-sm rounded border transition-colors ${
              p === page
                ? 'bg-pink-500 border-pink-500 text-white'
                : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1.5 text-sm rounded border border-zinc-200 dark:border-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          Next
        </button>
      </div>
    </nav>
  )
}
