'use client'

import { useMemo } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

interface MarkdownProps {
  markdown: string
  className?: string
}

export default function Markdown({ markdown, className }: MarkdownProps) {
  const html = useMemo(() => {
    const raw = marked.parse(markdown || '') as string
    const safe = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } })
    return safe
  }, [markdown])

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function markdownToPlainText(markdown: string, maxLength?: number): string {
  const raw = marked.parse(markdown || '') as string
  const text = (raw || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  if (!maxLength) return text
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}


