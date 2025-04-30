import { Mdx } from './mdx-components'

interface MdxWrapperProps {
  code: string
}

export function MdxWrapper({ code }: MdxWrapperProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Mdx code={code} />
    </div>
  )
} 