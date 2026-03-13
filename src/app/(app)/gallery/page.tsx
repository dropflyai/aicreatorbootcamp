import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

async function getGalleryData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: membership } = await supabase
    .from('class_members')
    .select('class:classes(*)')
    .eq('user_id', user.id)
    .single()

  const classData = (Array.isArray(membership?.class) ? membership.class[0] : membership?.class) as { id?: string } | null
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
        </div>

        {projects.length > 0 ? (
          <GalleryGrid projects={projects} currentUserId={currentUserId} />
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-white/60 mb-6">
                Be the first to submit a project and show off your work!
              </p>
              <Link href="/create">
                <Button>Create Project</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
