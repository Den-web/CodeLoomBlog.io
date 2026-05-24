import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { AnalyticsWrapper } from '@/components/analytics-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Code Loom Blog',
  description:
    'Architecture, full-stack, and AI-augmented delivery — by Denys Kirev, Full-Stack Developer.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-7xl mx-auto py-10 px-4">
            <header>
              <div className="absolute top-5 right-5">
                <ModeToggle />
              </div>

              <div className="flex items-center justify-between">
                <span className="relative top-[4px] italic justify-end p-4">
                  <Link href="https://github.com/Den-web" target="_blank">
                    <Image
                      alt="Denys Kirev"
                      src="https://avatars.githubusercontent.com/Den-web"
                      width={32}
                      height={32}
                      className="relative -top-1 mx-1 inline rounded-full"
                    />
                  </Link>
                  by Denys Kirev
                </span>

                <nav className="ml-auto text-sm font-medium space-x-6">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link
                    href="https://www.linkedin.com/in/denys-kirev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </nav>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
