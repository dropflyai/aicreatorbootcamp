'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import {
  Sparkles,
  Film,
  Music,
  ImageIcon,
  TrendingUp,
  ChevronDown,
  Play,
  Check,
  School,
  Mail,
  ChevronRight,
  Star,
} from 'lucide-react'
import { isDemoMode } from '@/lib/demo'
import { createClient } from '@/lib/supabase/client'

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tools = [
  { name: 'Claude', emoji: '🤖', desc: 'AI writing & ideation', color: '#FF6B2B' },
  { name: 'Runway', emoji: '🎬', desc: 'AI video generation', color: '#6366F1' },
  { name: 'Kling', emoji: '🎥', desc: 'Next-gen video AI', color: '#EC4899' },
  { name: 'Higgsfield', emoji: '✨', desc: 'Cinematic video effects', color: '#8B5CF6' },
  { name: 'ElevenLabs', emoji: '🎙️', desc: 'AI voice & audio', color: '#10B981' },
  { name: 'Suno', emoji: '🎵', desc: 'AI music creation', color: '#F59E0B' },
  { name: 'Midjourney', emoji: '🖼️', desc: 'AI image generation', color: '#3B82F6' },
  { name: 'Canva AI', emoji: '🎨', desc: 'AI-powered design', color: '#00C4CC' },
  { name: 'CapCut AI', emoji: '✂️', desc: 'AI video editing', color: '#FF3B5C' },
]

const creatorTypes = [
  {
    icon: Film,
    label: 'Video Creator',
    color: '#A855F7',
    examples: ['AI short films', 'YouTube content', 'Viral Reels'],
    desc: 'Direct AI-generated scenes, add cinematic effects, and publish professional video content.',
  },
  {
    icon: Music,
    label: 'Music Producer',
    color: '#EC4899',
    examples: ['AI music tracks', 'Podcast intros', 'Film soundtracks'],
    desc: 'Compose original music, generate voiceovers, and produce studio-quality audio.',
  },
  {
    icon: ImageIcon,
    label: 'Visual Artist',
    color: '#3B82F6',
    examples: ['AI illustrations', 'Brand kits', 'Thumbnail design'],
    desc: 'Create stunning visuals, build brand identities, and design across every platform.',
  },
  {
    icon: TrendingUp,
    label: 'Content Strategist',
    color: '#BFFF00',
    examples: ['Viral hooks', 'Content calendars', 'Brand deal pitches'],
    desc: 'Master the creator economy — write, pitch, and grow an audience using AI strategy.',
  },
]

const curriculum = [
  { week: 1, title: 'AI Foundations', desc: 'Intro to AI tools, prompting basics, and the creator mindset', accent: '#BFFF00' },
  { week: 2, title: 'Image Mastery', desc: 'Midjourney, Canva AI, brand kits, and thumbnail design', accent: '#3B82F6' },
  { week: 3, title: 'Video Creation', desc: 'Runway, Kling, and Higgsfield — from script to screen', accent: '#A855F7' },
  { week: 4, title: 'Audio & Music', desc: 'ElevenLabs voiceovers, Suno music, and podcast production', accent: '#EC4899' },
  { week: 5, title: 'Content Strategy', desc: 'Viral hooks, captions, and platform-native content with Claude', accent: '#F59E0B' },
  { week: 6, title: 'Short-Form Video', desc: 'CapCut AI editing, Reels, TikTok, and Shorts mastery', accent: '#10B981' },
  { week: 7, title: 'Personal Branding', desc: 'Build your creator brand, logo, and visual identity', accent: '#BFFF00' },
  { week: 8, title: 'Monetization', desc: 'Brand deals, sponsorships, pitching, and the creator economy', accent: '#3B82F6' },
  { week: 9, title: 'Capstone Project', desc: 'Plan and begin your signature AI-created video project', accent: '#A855F7' },
  { week: 10, title: 'Demo Day', desc: 'Present your portfolio. Earn your certificate. Ship it.', accent: '#BFFF00' },
]

const faqs = [
  {
    q: 'Do I need coding experience?',
    a: 'None at all. This bootcamp is about creating with AI — videos, music, images, content. Zero coding required.',
  },
  {
    q: 'What do I need to participate?',
    a: 'Just a laptop and an internet connection. We handle all tool subscriptions and setup.',
  },
  {
    q: 'What will I actually make?',
    a: '5+ real projects throughout the program, plus a capstone video you build and own by Demo Day.',
  },
  {
    q: 'Is there a cost for students?',
    a: 'Program costs are fully covered for participating schools through grant funding and sponsor partnerships.',
  },
  {
    q: 'How do schools apply?',
    a: 'Email us at info@aicreatorbootcamp.com and we\'ll schedule a 15-minute call to discuss bringing the program to your school.',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-white/60 leading-relaxed border-t border-white/10 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const router = useRouter()
  const [demoLoading, setDemoLoading] = useState(false)
  const demoMode = isDemoMode()

  const handleDemoLogin = async () => {
    setDemoLoading(true)
    try {
      const response = await fetch('/api/demo/login', { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Demo login failed')
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.credentials.email,
        password: data.credentials.password,
      })
      if (authError) throw authError
      router.push('/home')
    } catch {
      alert('Demo login failed. Please try again.')
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#BFFF00] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <span className="font-bold text-white">AI Creator Bootcamp</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
          <a href="#tools" className="hover:text-white transition-colors">Tools</a>
          <a href="#schools" className="hover:text-white transition-colors">For Schools</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          {demoMode && (
            <button
              onClick={handleDemoLogin}
              disabled={demoLoading}
              className="text-sm text-white/50 hover:text-white transition-colors disabled:opacity-50"
            >
              {demoLoading ? 'Loading...' : 'Demo'}
            </button>
          )}
          <Link
            href="/login"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/join"
            className="text-sm bg-[#BFFF00] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#d4ff33] transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#BFFF00]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#A855F7]/10 rounded-full blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#BFFF00]/10 border border-[#BFFF00]/30 text-[#BFFF00] text-sm font-medium px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Now at Westchester High School, Los Angeles
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6">
            Learn to{' '}
            <span className="text-gradient-lime">Create</span>
            <br />
            with AI.
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            A 10-week bootcamp teaching the next generation of creators to use AI tools
            to make videos, music, images, and more.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-[#BFFF00] text-black font-bold text-lg px-8 py-4 rounded-2xl hover:bg-[#d4ff33] transition-all duration-200 hover:scale-105"
            >
              Apply Now
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-200"
            >
              Learn More
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────── */}
      <Section>
        <div className="border-y border-white/10 bg-white/[0.02] py-8 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { number: '10', label: 'Lessons' },
              { number: '9+', label: 'AI Tools' },
              { number: '5+', label: 'Real Projects' },
              { number: '1', label: 'Certificate' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="text-center px-4"
              >
                <div className="text-4xl font-black text-[#BFFF00] mb-1">{stat.number}</div>
                <div className="text-sm text-white/50 font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── WHAT YOU'LL CREATE ──────────────────────────────────────────── */}
      <section className="py-24 px-6" id="create">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#BFFF00] font-semibold text-sm uppercase tracking-widest mb-3">What You&apos;ll Create</p>
              <h2 className="text-4xl md:text-5xl font-black">
                Pick your creator path.
              </h2>
            </motion.div>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creatorTypes.map((type) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.label}
                  variants={fadeUp}
                  className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-white/20 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${type.color}10 0%, transparent 60%)`,
                    }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${type.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: type.color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{type.label}</h3>
                  <p className="text-white/50 mb-5 leading-relaxed">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border"
                        style={{ borderColor: `${type.color}40`, color: type.color }}
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </Section>
        </div>
      </section>

      {/* ── TOOLS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5" id="tools">
        <div className="max-w-6xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#BFFF00] font-semibold text-sm uppercase tracking-widest mb-3">Tools You&apos;ll Master</p>
              <h2 className="text-4xl md:text-5xl font-black">
                Industry-leading AI tools,{' '}
                <span className="text-gradient-lime">day one.</span>
              </h2>
              <p className="text-white/50 text-lg mt-4 max-w-xl mx-auto">
                No toy apps. Real platforms used by professional creators worldwide.
              </p>
            </motion.div>
          </Section>

          <Section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center hover:border-white/20 transition-all duration-200 cursor-default"
              >
                <div className="text-3xl mb-3">{tool.emoji}</div>
                <div className="font-bold text-sm mb-1">{tool.name}</div>
                <div className="text-xs text-white/40 leading-tight">{tool.desc}</div>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── CURRICULUM ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5" id="curriculum">
        <div className="max-w-4xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#BFFF00] font-semibold text-sm uppercase tracking-widest mb-3">The Curriculum</p>
              <h2 className="text-4xl md:text-5xl font-black">
                10 weeks. Real skills.
              </h2>
              <p className="text-white/50 text-lg mt-4">
                Each session is 90 minutes of hands-on creation — no lectures, no busywork.
              </p>
            </motion.div>
          </Section>

          <Section className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-3 bottom-3 w-px bg-white/10" />

            <div className="space-y-4">
              {curriculum.map((item, i) => (
                <motion.div
                  key={item.week}
                  variants={fadeUp}
                  className="relative flex gap-6 md:gap-8 group"
                >
                  {/* Week dot */}
                  <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/15 bg-[#0a0a0a] flex flex-col items-center justify-center z-10">
                    <div className="text-[10px] text-white/30 uppercase tracking-widest leading-none">Wk</div>
                    <div className="text-lg font-black" style={{ color: item.accent }}>{item.week}</div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-4 group-last:pb-0 border-b border-white/5 group-last:border-0">
                    <div className="flex flex-wrap items-start gap-3 mb-1">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      {i === curriculum.length - 1 && (
                        <span className="text-xs font-semibold bg-[#BFFF00]/10 text-[#BFFF00] border border-[#BFFF00]/30 px-2.5 py-0.5 rounded-full">
                          Demo Day
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#BFFF00] font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-black">Three steps to creator.</h2>
            </motion.div>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Apply',
                desc: 'Tell us a little about yourself and your creative interests. No experience needed — just curiosity.',
                color: '#BFFF00',
                icon: ChevronRight,
              },
              {
                step: '02',
                title: 'Learn',
                desc: '10 sessions of hands-on workshops. You\'ll use real AI tools from day one and build real projects every week.',
                color: '#A855F7',
                icon: Play,
              },
              {
                step: '03',
                title: 'Create & Launch',
                desc: 'Finish with a portfolio of 5+ projects, a capstone video, and a certificate. Your work is yours to keep and share.',
                color: '#EC4899',
                icon: Sparkles,
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  variants={fadeUp}
                  className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-8"
                >
                  <div className="text-6xl font-black opacity-10 absolute top-6 right-6" style={{ color: item.color }}>
                    {item.step}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${item.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              )
            })}
          </Section>
        </div>
      </section>

      {/* ── FOR SCHOOLS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5" id="schools">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="rounded-3xl border border-[#BFFF00]/20 bg-[#BFFF00]/[0.03] p-10 md:p-16 text-center">
              <motion.div variants={fadeUp}>
                <div className="w-16 h-16 rounded-2xl bg-[#BFFF00]/10 border border-[#BFFF00]/30 flex items-center justify-center mx-auto mb-6">
                  <School className="w-8 h-8 text-[#BFFF00]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  Bring AI Creator Bootcamp<br />to your school.
                </h2>
                <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
                  We handle everything — curriculum, tools, instruction, and certificates.
                  Zero cost to your school.
                </p>
              </motion.div>

              <Section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  'Complete curriculum & lesson plans',
                  'Instructor included',
                  'All tool subscriptions covered',
                  'Aligns with CTE Digital Media standards',
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="flex items-start gap-3 text-left bg-white/5 rounded-2xl p-4"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#BFFF00]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#BFFF00]" />
                    </div>
                    <span className="text-sm text-white/70 leading-snug">{item}</span>
                  </motion.div>
                ))}
              </Section>

              <motion.div variants={fadeUp}>
                <a
                  href="mailto:info@aicreatorbootcamp.com?subject=School Partnership Inquiry"
                  className="inline-flex items-center gap-2 bg-[#BFFF00] text-black font-bold text-lg px-8 py-4 rounded-2xl hover:bg-[#d4ff33] transition-all duration-200 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  Request Information
                </a>
                <p className="text-white/30 text-sm mt-4">info@aicreatorbootcamp.com</p>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── TESTIMONIALS (placeholder) ──────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-[#BFFF00] font-semibold text-sm uppercase tracking-widest mb-3">Student Voices</p>
              <h2 className="text-4xl md:text-5xl font-black">
                From students like you.
              </h2>
            </motion.div>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Future Student', school: 'Westchester High School', quote: 'Testimonials coming after our first cohort — launching Spring 2026.' },
              { name: 'Future Student', school: 'Westchester High School', quote: 'Testimonials coming after our first cohort — launching Spring 2026.' },
              { name: 'Future Student', school: 'Westchester High School', quote: 'Testimonials coming after our first cohort — launching Spring 2026.' },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#BFFF00]/30 text-[#BFFF00]/30" />
                  ))}
                </div>
                <p className="text-white/40 italic text-sm mb-5 leading-relaxed">&quot;{t.quote}&quot;</p>
                <div>
                  <div className="font-semibold text-sm text-white/50">{t.name}</div>
                  <div className="text-xs text-white/30">{t.school}</div>
                </div>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5" id="faq">
        <div className="max-w-2xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-[#BFFF00] font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-black">Got questions?</h2>
            </motion.div>
          </Section>

          <Section className="space-y-3">
            {faqs.map((faq) => (
              <motion.div key={faq.q} variants={fadeUp}>
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <motion.div variants={fadeUp}>
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                Ready to{' '}
                <span className="text-gradient-lime">create?</span>
              </h2>
              <p className="text-white/50 text-xl mb-10 max-w-lg mx-auto">
                Spots are limited. Apply now for the Spring 2026 cohort at Westchester High School.
              </p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 bg-[#BFFF00] text-black font-black text-xl px-10 py-5 rounded-2xl hover:bg-[#d4ff33] transition-all duration-200 hover:scale-105"
              >
                Apply Now — It&apos;s Free
                <ChevronRight className="w-6 h-6" />
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#BFFF00] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <span className="font-bold text-white">AI Creator Bootcamp</span>
              </div>
              <p className="text-white/30 text-sm max-w-xs leading-relaxed">
                Teaching the next generation of creators to build with AI.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
              <Link href="/join" className="text-white/40 hover:text-white transition-colors">Apply</Link>
              <a href="#curriculum" className="text-white/40 hover:text-white transition-colors">Curriculum</a>
              <a href="#schools" className="text-white/40 hover:text-white transition-colors">For Schools</a>
              <a href="#faq" className="text-white/40 hover:text-white transition-colors">FAQ</a>
              <a href="mailto:info@aicreatorbootcamp.com" className="text-white/40 hover:text-white transition-colors">Contact</a>
              <Link href="/login" className="text-white/40 hover:text-white transition-colors">Sign In</Link>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/20">
            <p>© 2026 AI Creator Bootcamp. All rights reserved.</p>
            <p>aicreatorbootcamp.com</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
