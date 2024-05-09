import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

export const Markdown = ({ children }: { children: string }) => {
  return (
    // <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {children}
    </ReactMarkdown>
  )
}
