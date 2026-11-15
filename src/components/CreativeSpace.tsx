import { CREATIVE_INTERESTS } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Feather } from 'lucide-react';
import { TornPaperBox } from './TornPaperBox';

export const CreativeSpace = () => {
  return (
    <section id="creative-dimension" className="relative w-full py-24 px-6 sm:px-10 surface-deep border-t border-white/6 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#11141d] border border-white/8 text-slate-300 text-xs font-mono mb-3">
            <Feather className="w-3.5 h-3.5 text-sky-400" />
            <span>INTERESTS & PERSPECTIVES // 04</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white font-['Space_Grotesk']">
            Creative dimensions
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            Engineering precision paired with creative curiosity. Poetry, cinematic framing, and physical discipline.
          </p>
        </div>

        {/* Editorial Reflection Box in Torn Paper Manuscript */}
        <div className="mb-10">
          <TornPaperBox
            hasTape={true}
            tapePosition="both"
            stamp="CREATIVE MANUSCRIPT // PERSONAL PHILOSOPHY"
            hasPerforation={true}
            driftVariant="slow"
            bgDarkness="parchment"
          >
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed font-['Space_Grotesk'] italic">
              &ldquo;Building software and writing verse share the same core pursuit: stripping away unnecessary noise until only the essential structure remains.&rdquo;
            </p>
            <div className="mt-4 text-xs font-mono text-slate-400 flex items-center justify-between border-t border-white/8 pt-3">
              <span>— Asmit Rawat // On systems and creative expression</span>
              <span className="text-slate-500 text-[10px]">GREATER NOIDA</span>
            </div>
          </TornPaperBox>
        </div>

        {/* Creative Cards Wrapped in Torn Paper Sheets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CREATIVE_INTERESTS.map((hobby, i) => (
            <TornPaperBox
              key={i}
              hasTape={true}
              tapePosition={i % 2 === 0 ? 'top-left' : 'top-right'}
              driftVariant={i % 2 === 0 ? 'slow' : 'reverse'}
              stamp={`NOTE // 0${i + 1}`}
              className="h-full"
            >
              <div 
                onMouseEnter={() => sound.playBlip(900, 0.02)}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="text-[11px] font-mono text-sky-400 mb-2">
                    {hobby.category}
                  </div>

                  <h3 className="text-base font-medium text-white font-['Space_Grotesk']">
                    {hobby.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {hobby.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/8 flex flex-wrap gap-1">
                  {hobby.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-1.5 py-0.5 rounded-sm bg-[#131722] text-[10px] font-mono text-slate-400 border border-white/6"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </TornPaperBox>
          ))}
        </div>

      </div>
    </section>
  );
};
