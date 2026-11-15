import { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Search, Award, Cpu } from 'lucide-react';
import { TornPaperBox } from './TornPaperBox';

export const SkillsRadar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <section id="skills-matrix" className="relative w-full py-24 px-6 sm:px-10 surface-base border-t border-white/6 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#11141d] border border-white/8 text-slate-300 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>PROFICIENCIES & LAB NOTEBOOK // 03</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white font-['Space_Grotesk']">
              Skills & architectures
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Transparent self-ratings across systems programming, AI runtime orchestration, and development tools.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#0e1119] border border-white/10 rounded-sm text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-white/20 shadow-inner"
            />
          </div>
        </div>

        {/* Categories Grid of Torn Paper Sheets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const filteredSkills = category.skills.filter(s => 
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (s.note && s.note.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (filteredSkills.length === 0) return null;

            return (
              <TornPaperBox 
                key={catIdx} 
                hasTape={true}
                tapePosition={catIdx % 2 === 0 ? 'top-left' : 'top-right'}
                driftVariant={catIdx % 2 === 0 ? 'slow' : 'reverse'}
                stamp={`TECH LAB RECORD // #${catIdx + 1} - ${category.title.toUpperCase()}`}
                hasPerforation={catIdx === 0}
              >
                <div className="mb-4 pb-3 border-b border-white/8">
                  <h3 className="text-base font-medium font-['Space_Grotesk'] text-white">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {filteredSkills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      onMouseEnter={() => sound.playBlip(950, 0.02)}
                      className="p-3 rounded-sm bg-[#090b10] border border-white/6 hover:border-white/14 transition-all"
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-normal text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-[#161a26] text-slate-300">
                          {skill.level}
                        </span>
                      </div>

                      {/* Clean restrained progress bar */}
                      {skill.rating && (
                        <div className="w-full h-1 bg-[#1a1e2b] rounded-full mt-2.5 overflow-hidden">
                          <div 
                            className="h-full bg-slate-300 rounded-full transition-all duration-500"
                            style={{ width: `${(skill.rating / 5) * 100}%` }}
                          />
                        </div>
                      )}

                      {skill.note && (
                        <div className="text-[11px] font-mono text-slate-400 mt-1.5 flex items-center gap-1.5">
                          <span className="text-slate-500">↳</span>
                          <span>{skill.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TornPaperBox>
            );
          })}
        </div>

        {/* Academic & Certification Callout Banner in Torn Paper Box */}
        <div className="mt-10">
          <TornPaperBox
            hasTape={true}
            tapePosition="center"
            driftVariant="slow"
            stamp="CERTIFIED CREDENTIAL // IBM OFFICIAL ARCHIVE"
            hasPerforation={true}
            bgDarkness="parchment"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-sm bg-sky-950/60 border border-sky-500/30 text-sky-400 shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Academic verification & credentials
                  </div>
                  <div className="text-sm sm:text-base font-medium text-white mt-1">
                    IBM Certified — Java Fundamentals (CEJAVA1N)
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Greater Noida College of Technology (GNCT, AKTU) • B.Tech CSE (3rd Year, 5th Sem, 5.62 SGPA)
                  </p>
                </div>
              </div>

              <a 
                href="https://github.com/Asmitrawat4078" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 rounded-sm bg-[#181d2c] hover:bg-[#20273a] text-slate-200 text-xs font-mono border border-white/10 transition-colors shrink-0 shadow-sm"
              >
                13 repos on GitHub
              </a>
            </div>
          </TornPaperBox>
        </div>

      </div>
    </section>
  );
};
