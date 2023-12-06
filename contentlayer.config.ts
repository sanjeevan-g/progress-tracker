import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: 'string',
            required: true
        },
        publishedAt: {
            type: "date",
            required: true,
        },
        updatedAt: {
            type: "date",
            required: true,
        },
        tags: {
            type: "list",
            of: { type: "string" },
        },
    },
    computedFields: {
        url: { type: 'string', resolve: (post) => `${post._raw.flattenedPath}` },
    },
}))

const codeOptions = {
    theme: 'github-dark',
    grid: false,
}

export default makeSource({
    contentDirPath: 'post',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }], [rehypePrettyCode, codeOptions]]
    }
})