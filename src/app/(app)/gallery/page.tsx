import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Heart, MessageCircle, Share2, Filter, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

async function getGalleryData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('class_members')
    .select('class:classes(*)')
    .eq('user_id', user.id)
    .single()

  const classData = membership?.class as { id?: string } | null
  const classId = classData?.id

  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      user:profiles(id, name, avatar_url, level),
      reactions(emoji, user_id)
    `)
    .eq('class_id', classId)
    .eq('status', 'submitted')
    .order('created_at', { ascending: false })

  return {
    projects: projects || [],
    currentUserId: user.id,
  }
}

export default async function GalleryPage() {
  const { projects, currentUserId } = await getGalleryData()

  return (
    <div className="min-h-screen pb-24 lg:pb-8 lg:pl-64">
      <main className="px-4 py-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gallery</h1>
            <p className="text-white/60">Check out what your classmates are creating</p>
          </div>
          <Button variant="secondary" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => {
              const fireCount = project.reactions?.filter((r: any) => r.emoji === '🔥').length || 0
              const hasUserReacted = project.reactions?.some(
                (r: any) => r.user_id === currentUserId && r.emoji === '🔥'
              )

              return (
                <Card key={project.id} variant="interactive" className="overflow-hidden">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-white/5 relative">
                    {project.thumbnail_url ? (
                      <Image
                        src={project.thumbnail_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white/20" />
                      </div>
                    )}

                    {/* Challenge Badge */}
                    {project.challenge_id && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full bg-[#BFFF00]/20 text-[#BFFF00] text-xs font-medium">
                          Week {project.week} Challenge
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    {/* Creator Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden flex-shrink-0">
                        {project.user?.avatar_url ? (
                          <Image
                            src={project.user.avatar_url}
                            alt={project.user.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs">
                            {project.user?.name?.[0] || '?'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{project.user?.name}</p>
                        <p className="text-xs text-white/40">Level {project.user?.level || 1}</p>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-semibold mb-1 truncate">{project.title}</h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <button
                          className={`flex items-center gap-1.5 text-sm transition-colors ${
                            hasUserReacted
                              ? 'text-[#FF6B6B]'
                              : 'text-white/60 hover:text-[#FF6B6B]'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${hasUserReacted ? 'fill-current' : ''}`} />
                          <span>{fireCount}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{project.feedback_count || 0}</span>
                        </button>
                      </div>
                      <button className="text-white/40 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-white/60 mb-6">
                Be the first to submit a project and show off your work!
              </p>
              <Button>Create Project</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
