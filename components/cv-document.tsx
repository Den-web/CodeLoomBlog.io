import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CvDocumentProps {
  markdown: string
}

export function CvDocument({ markdown }: CvDocumentProps) {
  return (
    <div className="cv-document max-w-3xl mx-auto prose prose-zinc dark:prose-invert prose-headings:scroll-mt-20 prose-h2:text-base prose-h2:font-bold prose-h2:uppercase prose-h2:tracking-wide prose-h2:border-b prose-h2:border-zinc-200 prose-h2:dark:border-zinc-700 prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-sm prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-1 prose-p:text-sm prose-li:text-sm prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-pink-400">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
