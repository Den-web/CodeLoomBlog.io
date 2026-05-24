import fs from 'fs'
import path from 'path'

export const CV_MARKDOWN_PATH = path.join(process.cwd(), 'data', 'cv.md')

export const CV_PDF_FILENAME = 'Denys_Kirev-Full-Stack_Developer-2026.pdf'
export const CV_PDF_PATH = `/cv/${CV_PDF_FILENAME}`

export function getCvMarkdown(): string {
  return fs.readFileSync(CV_MARKDOWN_PATH, 'utf8')
}

export function cvPdfExists(): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', 'cv', CV_PDF_FILENAME))
}
