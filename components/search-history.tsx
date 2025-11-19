'use client'

import { History } from 'lucide-react'

interface SearchHistoryProps {
  history: string[]
  onSelect: (query: string) => void
}

export default function SearchHistory({ history, onSelect }: SearchHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <History size={18} className="text-muted-foreground" />
        <h3 className="text-sm font-semibold text-muted-foreground">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((query) => (
          <button
            key={query}
            onClick={() => onSelect(query)}
            className="px-3 py-1 bg-muted hover:bg-secondary rounded-full text-sm text-foreground transition"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  )
}
