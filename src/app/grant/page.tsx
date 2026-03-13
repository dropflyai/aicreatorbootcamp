'use client'

import { Sparkles, Check } from 'lucide-react'

export default function GrantPage() {
  return (
    <>
      {/* ── Print styles injected via style tag ── */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-size: 11pt;
          }
          .no-print { display: none !important; }
          .print-page {
            width: 8.5in;
            min-height: 11in;
            padding: 0.6in 0.65in;
            margin: 0 auto;
            box-shadow: none !important;
            border: none !important;
          }
          .print-accent { color: #2563EB !important; }
          .print-border-accent { border-color: #2563EB !important; }
          .print-bg-accent { background: #EFF6FF !important; }
          .print-hidden-web { display: block !important; }
          a { color: inherit !important; text-decoration: none !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        @media screen {
          .print-hidden-web { display: none; }
        }
      `}</style>

      {/* ── Web top bar ── */}
      <div className="no-print bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#BFFF00] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          <span className="font-bold text-white text-sm">AI Creator Bootcamp</span>
        </div>
        <button
          onClick={() => window.print()}
          className="text-sm bg-[#BFFF00] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#d4ff33] transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* ── Document ── */}
      <div className="min-h-screen bg-gray-100 py-8 px-4 print:py-0 print:px-0 print:bg-white">
        <div
          className="print-page bg-white rounded-xl shadow-xl mx-auto overflow-hidden"
          style={{ maxWidth: '8.5in' }}
        >
          {/* Header band */}
          <div className="bg-[#0a0a0a] px-10 py-8 print:bg-black">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#BFFF00] flex items-center justify-center print-bg-accent">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-black text-white text-lg tracking-tight">AI CREATOR BOOTCAMP</span>
                </div>
                <h1 className="text-3xl font-black text-white leading-tight">
                  A 10-Week AI Creation Program<br />for High School Students
                </h1>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[#BFFF00] text-sm font-semibold uppercase tracking-widest mb-1 print-accent">Grant Request</div>
                <div className="text-4xl font-black text-white">$19,990</div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-10 py-8 print:px-0 print:py-6">
            {/* 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Left col — wide */}
              <div className="md:col-span-2 space-y-7">

                {/* Program Summary */}
                <section>
                  <SectionHeader>Program Summary</SectionHeader>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    AI Creator Bootcamp is a project-based learning program that equips high school
                    students with the skills to create professional-quality content using cutting-edge
                    AI tools. Students learn to produce videos, music, images, and digital media using
                    industry-leading platforms including Claude, Runway, ElevenLabs, Suno, Midjourney,
                    Canva AI, and more.
                  </p>
                </section>

                {/* Curriculum */}
                <section>
                  <SectionHeader>Curriculum Highlights</SectionHeader>
                  <div className="space-y-2">
                    {[
                      { weeks: 'Weeks 1–2', title: 'AI Fundamentals & Image Generation', desc: 'Prompting, Claude, Midjourney, Canva AI' },
                      { weeks: 'Weeks 3–4', title: 'AI Video & Audio Creation', desc: 'Runway, Kling, Higgsfield, ElevenLabs, Suno' },
                      { weeks: 'Weeks 5–6', title: 'Content Strategy & Platform Mastery', desc: 'Short-form video, captions, viral hooks' },
                      { weeks: 'Weeks 7–8', title: 'Personal Brand Development', desc: 'Brand identity, monetization, sponsorship pitching' },
                      { weeks: 'Weeks 9–10', title: 'Capstone Project & Demo Day', desc: 'Signature video project + certificate ceremony' },
                    ].map((row) => (
                      <div key={row.weeks} className="flex gap-3 text-sm">
                        <span className="text-blue-600 font-semibold w-24 shrink-0 print-accent">{row.weeks}</span>
                        <span className="text-gray-800 font-medium">{row.title}</span>
                        <span className="text-gray-500 hidden md:inline">— {row.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Student Outcomes */}
                <section>
                  <SectionHeader>Student Outcomes</SectionHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'Portfolio of 5+ AI-created projects',
                      'Proficiency in 8+ AI creation tools',
                      'Completed capstone video project',
                      'Certificate of completion',
                      'Understanding of the creator economy',
                      'Monetization & brand deal skills',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0 print-accent" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tools */}
                <section>
                  <SectionHeader>Tools & Platforms</SectionHeader>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Claude (AI writing)',
                      'Runway (AI video)',
                      'Kling (AI video)',
                      'Higgsfield (video effects)',
                      'ElevenLabs (AI audio)',
                      'Suno (AI music)',
                      'Midjourney (AI images)',
                      'CapCut AI (editing)',
                      'Canva AI (design)',
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right col — sidebar */}
              <div className="space-y-5">
                {/* Program Details */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <SectionHeader>Program Details</SectionHeader>
                  <div className="space-y-2 text-sm">
                    {[
                      ['Duration', '10 sessions, 5 weeks'],
                      ['Session Length', '90 minutes'],
                      ['Format', 'In-person workshop'],
                      ['Cohort Size', '20–30 students'],
                      ['Grade Level', '9th–12th grade'],
                      ['Frequency', '2x per week'],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-2">
                        <span className="text-gray-500">{label}</span>
                        <span className="text-gray-900 font-medium text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pilot School */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                  <SectionHeader>Pilot School</SectionHeader>
                  <div className="text-sm text-gray-800 space-y-1">
                    <p className="font-bold text-gray-900">Westchester High School</p>
                    <p className="text-gray-600">Los Angeles Unified School District</p>
                    <p className="text-gray-600">CAP (College & Career Academy) Program</p>
                    <p className="text-gray-500 text-xs mt-2">Title I School — underserved student population</p>
                  </div>
                </div>

                {/* Budget */}
                <div className="bg-gray-900 rounded-xl p-5 text-white print:bg-gray-800">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Budget Request</div>
                  <div className="text-3xl font-black text-[#BFFF00] mb-3">$19,990</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Covers for one cohort:</p>
                    <ul className="space-y-0.5 pl-3 list-disc text-gray-300">
                      <li>Instructor compensation</li>
                      <li>Curriculum development</li>
                      <li>Tool subscriptions</li>
                      <li>Student materials</li>
                      <li>Certificates & program admin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact bar */}
            <div className="border-t border-gray-200 pt-7">
              <SectionHeader>Impact Statement</SectionHeader>
              <p className="text-gray-700 text-sm leading-relaxed">
                The creator economy is a $250B+ industry. AI tools are transforming creative work across video production, music,
                graphic design, and content strategy. Westchester High School serves a predominantly Title I student population
                — this program provides real, marketable skills in an industry that rarely reaches underserved communities.
                AI literacy is the literacy gap of our generation.
              </p>
            </div>

            {/* Sponsors */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Tool Sponsors & Partners</div>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                {['Runway', 'Kling AI', 'Higgsfield', 'ElevenLabs', 'Suno', 'Canva', 'Adobe Firefly', 'Anthropic'].map((s) => (
                  <span key={s} className="border border-gray-300 rounded px-2 py-0.5">{s}</span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-gray-500">
              <div>
                <span className="font-semibold text-gray-800">AI Creator Bootcamp</span>
                {' · '}
                <a href="mailto:info@aicreatorbootcamp.com" className="hover:text-blue-600 transition-colors">
                  info@aicreatorbootcamp.com
                </a>
                {' · '}
                <span>aicreatorbootcamp.com</span>
              </div>
              <div className="text-gray-400 text-xs">Program Overview v1.0 — Spring 2026</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3 print-accent">
      {children}
    </h2>
  )
}
