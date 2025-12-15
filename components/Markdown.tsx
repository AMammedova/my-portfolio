import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

export default function Markdown({ content }: { content: string }) {
  return (
    <article className="prose prose-invert lg:prose-xl max-w-none prose-p:leading-relaxed prose-h2:text-purple-400 prose-h2:mt-12 prose-h3:text-pink-400 prose-h3:mt-8 prose-code:bg-gray-800 prose-code:rounded prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-950/30 prose-blockquote:p-4">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-pink-400 mt-4 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold text-purple-400 mt-4 mb-4 border-b border-purple-600 pb-1" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-pink-300 mt-8 mb-3" {...props} />,
          p: ({ node, ...props }) => <p className="my-4 text-white/95 text-lg" {...props} />,
          code: ({ node, className, children, ...props }) =>
            className ? (
              <code className={className + " bg-gray-800 rounded px-2 py-1 text-sm"} {...props}>
                {children}
              </code>
            ) : (
              <code className="bg-gray-800 rounded px-2 py-1 text-sm" {...props}>{children}</code>
            ),
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-500 bg-purple-800/10 p-4 my-6" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc ml-6 my-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal ml-6 my-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-2 text-white/90" {...props} />,
          table: ({ node, ...props }) => <div className="overflow-x-auto my-8"><table className="w-full text-left border-collapse border border-gray-700 bg-gray-900/50 rounded-lg overflow-hidden" {...props} /></div>,
          thead: ({ node, ...props }) => <thead className="bg-gray-800/80 text-purple-300" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-700/50" {...props} />,
          tr: ({ node, ...props }) => <tr className="hover:bg-gray-800/30 transition-colors" {...props} />,
          th: ({ node, ...props }) => <th className="p-4 font-semibold text-sm uppercase tracking-wider" {...props} />,
          td: ({ node, ...props }) => <td className="p-4 text-white/80" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
