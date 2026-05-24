'use client'

interface CvToolbarProps {
  pdfUrl: string
  pdfAvailable: boolean
}

export function CvToolbar({ pdfUrl, pdfAvailable }: CvToolbarProps) {
  return (
    <div className="cv-no-print flex flex-wrap items-center gap-3 mb-8">
      {pdfAvailable ? (
        <a
          href={pdfUrl}
          download={pdfUrl.split('/').pop()}
          className="inline-flex items-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 transition-colors"
        >
          Download PDF
        </a>
      ) : (
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          PDF generating on next deploy — use Print below
        </span>
      )}
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
      >
        Print / Save as PDF
      </button>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 w-full sm:w-auto">
        Share:{' '}
        <button
          type="button"
          className="text-pink-600 dark:text-pink-400 hover:underline"
          onClick={() => {
            void navigator.clipboard.writeText(window.location.href)
          }}
        >
          Copy page link
        </button>
      </p>
    </div>
  )
}
