import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  variant?: 'light' | 'dark'; // 'light' = light text (default), 'dark' = dark text
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '', variant = 'light' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => <h1 className={`text-2xl font-bold mb-4 ${isLight ? 'text-white' : 'text-gray-900'}`} {...props} />,
          h2: ({ node, ...props }) => <h2 className={`text-xl font-bold mb-3 mt-6 ${isLight ? 'text-white' : 'text-gray-900'}`} {...props} />,
          h3: ({ node, ...props }) => <h3 className={`text-lg font-semibold mb-2 mt-4 ${isLight ? 'text-white/90' : 'text-gray-800'}`} {...props} />,
          p: ({ node, ...props }) => <p className={`mb-3 leading-relaxed ${isLight ? 'text-white/70' : 'text-gray-700'}`} {...props} />,
          ul: ({ node, ...props }) => <ul className={`mb-4 ml-6 list-disc space-y-2 ${isLight ? 'text-white/70' : 'text-gray-700'}`} {...props} />,
          ol: ({ node, ...props }) => <ol className={`mb-4 ml-6 list-decimal space-y-2 ${isLight ? 'text-white/70' : 'text-gray-700'}`} {...props} />,
          li: ({ node, ...props }) => <li className="text-sm" {...props} />,
          strong: ({ node, ...props }) => <strong className={`font-bold ${isLight ? 'text-white' : 'text-gray-900'}`} {...props} />,
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code className={`${isLight ? 'bg-white/10 text-emerald-400' : 'bg-gray-100 text-emerald-600'} px-1.5 py-0.5 rounded text-sm font-mono`} {...props} />
            ) : (
              <code className={`block ${isLight ? 'bg-black/30' : 'bg-gray-100 text-gray-800'} p-3 rounded-lg text-sm font-mono overflow-x-auto my-3`} {...props} />
            ),
          a: ({ node, ...props }) => (
            <a className="text-emerald-400 hover:text-emerald-300 underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className={`border-l-4 border-emerald-500/50 pl-4 py-2 my-4 ${isLight ? 'bg-white/5 text-white/60' : 'bg-gray-50 text-gray-500'} italic`} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
