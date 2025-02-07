import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  return (
    <div className="prose prose-he:no-underline dark:prose-invert">
      {allPosts.map((post) => (
        <article className="prose-h2:mb-0 prose-p:mt-0" key={post._id}>
          <Link className="no-underline" href={post.slug}>
            <h2 className="">{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
