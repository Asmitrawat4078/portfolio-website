import { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { sound } from '../utils/audio';
import { 
  FolderGit2, 
  ExternalLink, 
  X,
  FileCode2
} from 'lucide-react';
import { TornPaperBox } from './TornPaperBox';

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & Systems', 'Personal AI', 'HealthTech', 'Data & Indexing', 'Algorithmic'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects-grid" className="relative w-full py-24 px-6 sm:px-10 surface-deep border-t border-white/6 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#11141d] border border-white/8 text-slate-300 text-xs font-mono mb-3">
              <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
              <span>CODEBASE & ARCHITECTURE DOSSIER // 02</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white font-['Space_Grotesk']">
              Engineered projects
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
              Verified systems spanning local-first AI runtimes, operating system sandboxes, econometric indexing, and SIH health accessibility.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-sm bg-[#0c0e15] border border-white/8 text-xs font-mono shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playBlip(700, 0.04);
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1a2030] text-white font-medium border border-white/12 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid of Torn Paper Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                sound.playBlip(800, 0.04);
                setActiveProject(project);
              }}
              className={`cursor-pointer ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <TornPaperBox
                hasTape={true}
                tapePosition={idx % 2 === 0 ? 'top-left' : 'top-right'}
                driftVariant={idx % 2 === 0 ? 'slow' : 'reverse'}
                stamp={`SPEC SHEET // #0${idx + 1} - ${project.category.toUpperCase()}`}
                hasPerforation={project.featured}
                className="h-full"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Meta header */}
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-sky-400 font-medium">{project.category}</span>
                      <span className="text-slate-300 px-2 py-0.5 rounded-sm bg-[#171b26] border border-white/8 text-[11px]">
                        {project.status}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-normal font-['Space_Grotesk'] text-white group-hover:text-sky-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Measurable Metrics */}
                    <div className="mt-4 space-y-1.5 pt-3 border-t border-white/8">
                      {project.metrics.slice(0, 2).map((metric, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                          <span className="text-emerald-400 shrink-0">✓</span>
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies list */}
                  <div className="mt-5 pt-3 border-t border-white/8 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 rounded-sm bg-[#131722] text-slate-300 text-[11px] font-mono border border-white/8"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-2 py-0.5 rounded-sm text-slate-400 text-[11px] font-mono">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </TornPaperBox>
            </div>
          ))}
        </div>

        {/* Clean Inspector Modal in Torn Paper Folder */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
              <TornPaperBox
                hasTape={true}
                tapePosition="both"
                stamp={`PROJECT DOSSIER // ${activeProject.id.toUpperCase()}`}
                hasPerforation={true}
                bgDarkness="deeper"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    sound.playBlip(600, 0.04);
                    setActiveProject(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-white/8 transition-colors cursor-pointer z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-xs font-mono text-slate-400 mb-1">
                  {activeProject.category} • {activeProject.status}
                </div>

                <h3 className="text-2xl font-normal font-['Space_Grotesk'] text-white">
                  {activeProject.title}
                </h3>

                <div className="text-sm text-slate-300 mt-1">
                  {activeProject.tagline}
                </div>

                <div className="text-xs font-mono text-slate-400 mt-2">
                  Role: <span className="text-slate-200">{activeProject.role}</span>
                </div>

                <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </div>

                {/* Highlights */}
                <div className="mt-5">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Key innovations & architecture
                  </div>
                  <div className="space-y-2">
                    {activeProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="text-sky-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Metrics */}
                <div className="mt-5 p-3.5 rounded-sm bg-[#090b10] border border-white/8">
                  <div className="text-xs font-mono text-emerald-400 mb-2">
                    Verified results
                  </div>
                  <div className="space-y-1.5">
                    {activeProject.metrics.map((m, i) => (
                      <div key={i} className="text-xs font-mono text-slate-300">
                        ✓ {m}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-5">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.technologies.map((t, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 rounded-sm bg-[#161a26] text-slate-300 text-xs font-mono border border-white/8"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 pt-4 border-t border-white/8 flex items-center justify-between">
                  {activeProject.githubUrl ? (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-sm bg-[#f0f2f5] text-[#0a0c12] font-medium text-xs font-mono flex items-center gap-2 hover:bg-white transition-colors"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      Inspect on GitHub
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">
                      Academic / Team project
                    </span>
                  )}

                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-3 py-1.5 rounded-sm text-slate-400 hover:text-white text-xs font-mono cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </TornPaperBox>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
