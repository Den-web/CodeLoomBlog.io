import { CvDocument } from '@/components/cv-document'
import { CvToolbar } from '@/components/cv-toolbar'
import { CV_PDF_PATH, cvPdfExists, getCvMarkdown } from '@/lib/cv'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CV — Denys Kirev',
  description:
    'Full-Stack Developer · AI-augmented workflows. Download PDF or view online — single source of truth.',
  openGraph: {
    title: 'Denys Kirev — Full-Stack Developer CV',
    description: 'AI-focused full-stack · OrchestrAI · React, Next.js, TypeScript, LLM workflows.',
  },
}

export default function CvPage() {
  const markdown = getCvMarkdown()
  const pdfAvailable = cvPdfExists()

  return (
    <div className="py-4">
      <CvToolbar pdfUrl={CV_PDF_PATH} pdfAvailable={pdfAvailable} />
      <CvDocument markdown={markdown} />
    </div>
  )
}
