#!/usr/bin/env node
/**
 * Build CV PDF from content/cv.md → public/cv/Denys_Kirev-Full-Stack_Developer-2026.pdf
 * Uses system Chrome (macOS) or CHROME_PATH env. Run: pnpm cv:pdf
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'
import puppeteer from 'puppeteer-core'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const input = path.join(root, 'data', 'cv.md')
const outDir = path.join(root, 'public', 'cv')
const outFile = path.join(outDir, 'Denys_Kirev-Full-Stack_Developer-2026.pdf')
const cssPath = path.join(__dirname, 'cv-pdf.css')

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
].filter(Boolean)

function resolveChrome() {
  for (const p of CHROME_PATHS) {
    if (p && fs.existsSync(p)) {
      return p
    }
  }
  return null
}

if (!fs.existsSync(input)) {
  console.error('Missing data/cv.md')
  process.exit(1)
}

const executablePath = resolveChrome()
if (!executablePath) {
  console.error(
    'Chrome not found. Set CHROME_PATH or install Google Chrome. PDF skipped — /cv still works with Print.'
  )
  process.exit(0)
}

const md = fs.readFileSync(input, 'utf8')
const css = fs.readFileSync(cssPath, 'utf8')
const body = marked.parse(md)

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <style>${css}</style>
</head>
<body>${body}</body>
</html>`

fs.mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
})
try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.pdf({
    path: outFile,
    format: 'A4',
    margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' },
    printBackground: true,
  })
  console.log('Wrote', outFile)
} finally {
  await browser.close()
}
