import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { allPages } from 'contentlayer/generated'
import { MdxWrapper } from '@/components/mdx-wrapper'

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/')
  const page = allPages.find(page => page.slugAsParams === slug)

  if (!page) {
    return null
  }

  return page
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPages.map(page => ({
    slug: page.slugAsParams.split('/'),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="py-6">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      {page.description && <p className="text-xl mt-4">{page.description}</p>}
      <hr className="my-6" />
      <MdxWrapper code={page.body.code} />
    </article>
  )
}
