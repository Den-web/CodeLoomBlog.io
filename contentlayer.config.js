import { defineDocumentType, makeSource } from 'contentlayer/source-files'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: doc => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    popularityScore: {
      type: 'number',
      default: 0,
    },
    linkedinUrl: {
      type: 'string',
    },
    linkedinReactions: {
      type: 'number',
    },
    linkedinComments: {
      type: 'number',
    },
    linkedinDiscovery: {
      type: 'string',
    },
    instagramUrl: {
      type: 'string',
    },
    series: {
      type: 'string',
    },
    seriesOrder: {
      type: 'number',
    },
    blogFirst: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Page],
})
