'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import { GalleryCard } from './gallery-card'

type ProjectType = 'all' | 'video' | 'image' | 'audio' | 'other'

interface GalleryGridProps {
  projects: any[]
  currentUserId: string
}

const filterOptions: { value: ProjectType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'video', label: '🎬 Video' },
  { value: 'image', label: '🖼️ Image' },
  { value: 'audio', label: '🎵 Audio' },
  { value: 'other', label: '✨ Other' },
]

export function GalleryGrid({ projects, currentUserId }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectType>('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.project_type === activeFilter)

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        <Filter className="w-4 h-4 text-white/40 flex-shrink-0" />
        {filterOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === opt.value
                ? 'bg-[#BFFF00] text-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project: any) => (
            <GalleryCard
              key={project.id}
              project={project}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-white/40">
          No {activeFilter} projects yet.{' '}
          <Link href="/create" className="text-[#BFFF00] hover:underline">
            Be the first!
          </Link>
        </div>
      )}
    </div>
  )
}
