import { sound } from '../utils/audio';
import { 
  Terminal, 
  ArrowDown,
  Layers,
  Award,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { TornPaperBox } from './TornPaperBox';

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between px-6 sm:px-10 pt-28 pb-12 text-white">
      {/* Top Meta Status Row */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Agent OS Platform // Local-First Development (RC5)</span>
        </div>
        <div className="hidden sm:block text-slate-400">
          {PERSONAL_INFO.college} • {PERSONAL_INFO.academicYear}
        </div>
      </div>

      {/* Main Headline Content */}
      <div className="w-full max-w-5xl mx-auto my-auto py-8">
        <div className="max-w-2xl text-left">
          
          {/* Torn Paper Header Badge */}
          <div className="inline-block mb-4 animate-paper-float-fast">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#101420]/90 backdrop-blur-sm border border-white/12 text-sky-300 text-xs font-mono shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>SYSTEMS ARCHITECT & LOCAL-FIRST AI</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-white font-['Space_Grotesk'] leading-[1.06]">
            Asmit Rawat
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Computer Science scholar developing <strong className="text-white font-medium">local-first AI desktop automation</strong>, 
            deterministic policy gateways, and operating system sandboxes.
          </p>

          {/* Genuine Credentials Torn Paper Card */}
          <div className="mt-7">
            <TornPaperBox 
              hasTape={true} 
              tapePosition="top-left" 
              driftVariant="slow"
              stamp="ACADEMIC & SECURITY ARCHIVE"
              className="max-w-xl"
            >
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded bg-black/40 border border-white/10 text-slate-200">
                  B.Tech CSE, 3rd year • AKTU (5.62 SGPA)
                </span>
                <span className="px-3 py-1.5 rounded bg-black/40 border border-white/10 text-slate-200 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  IBM Certified (Java Fundamentals CEJAVA1N)
                </span>
                <span className="px-3 py-1.5 rounded bg-black/40 border border-white/10 text-slate-200">
                  SIH Hackathon Contributor (NER CognitiveCare)
                </span>
              </div>
            </TornPaperBox>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playBlip(800, 0.04);
                document.getElementById('terminal-sandbox')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-sm bg-[#f0f2f5] text-[#0a0c12] font-medium text-xs font-mono flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
            >
              <Terminal className="w-3.5 h-3.5" />
              Open Agent OS terminal
            </button>

            <button
              onClick={() => {
                sound.playBlip(750, 0.04);
                document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-sm bg-[#11141d]/85 backdrop-blur-sm text-slate-200 border border-white/12 font-medium text-xs font-mono hover:bg-[#171b26] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-md"
            >
              <Layers className="w-3.5 h-3.5" />
              View 5 projects
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-white/6">
        <div className="flex items-center gap-2">
          <ArrowDown className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
          <span>Scroll to explore projects and technical architecture</span>
        </div>
        <span>Greater Noida, Uttar Pradesh, India</span>
      </div>
    </section>
  );
};
