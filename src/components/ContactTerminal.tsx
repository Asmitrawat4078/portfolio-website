import { useState, type FormEvent } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  GraduationCap
} from 'lucide-react';
import { TornPaperBox } from './TornPaperBox';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const ContactTerminal = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmitted, setTransmitted] = useState<boolean>(false);

  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sound.playBlip(850, 0.05);
    setIsTransmitting(true);

    setTimeout(() => {
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
      setIsTransmitting(false);
      setTransmitted(true);

      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject || 'Engineering Opportunity / Inquiry')}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact-transmission" className="relative w-full py-24 px-6 sm:px-10 surface-base border-t border-white/6 text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-[#11141d] border border-white/8 text-slate-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>COMMUNICATION & DIRECT DISPATCH // 05</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-white font-['Space_Grotesk']">
            Get in touch
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
            Available for software engineering roles, local AI development, and systems internships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
          
          {/* Left Column: Direct Info in Torn Paper Box */}
          <div className="md:col-span-2 space-y-5">
            <TornPaperBox
              hasTape={true}
              tapePosition="top-left"
              driftVariant="slow"
              stamp="STATIONERY CARD // DIRECT CONTACT"
            >
              {/* Status Box */}
              <div className="p-3.5 rounded-sm bg-[#080a10] border border-white/6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-medium">
                    Open for opportunities
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Actively seeking software engineering, systems programming, and local AI internships.
                </p>
              </div>

              {/* Coordinates List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div className="overflow-hidden">
                    <div className="text-xs font-mono text-slate-500">Email</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                      {PERSONAL_INFO.email}
                    </div>
                    <button
                      onClick={copyEmail}
                      className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy address'}
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/6 flex items-start gap-3">
                  <GithubIcon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-slate-500">GitHub</div>
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-medium text-slate-200 hover:text-white flex items-center gap-1"
                    >
                      @{PERSONAL_INFO.githubUsername}
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/6 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-slate-500">Location</div>
                    <div className="text-xs text-slate-300">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/6 flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-slate-500">Academic institution</div>
                    <div className="text-xs text-slate-300">
                      {PERSONAL_INFO.college}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {PERSONAL_INFO.university} • Graduating {PERSONAL_INFO.graduationYear}
                    </div>
                  </div>
                </div>
              </div>
            </TornPaperBox>
          </div>

          {/* Right Column: Clean Dispatch Form in Torn Paper Box */}
          <div className="md:col-span-3">
            <TornPaperBox
              hasTape={true}
              tapePosition="top-right"
              driftVariant="reverse"
              stamp="DISPATCH STATIONERY // TRANSMISSION"
              hasPerforation={true}
              bgDarkness="deeper"
            >
              <form onSubmit={handleTransmit}>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/8">
                  <div className="text-xs font-mono text-slate-300">
                    Compose inquiry
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Direct dispatch to Asmit
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Systems Engineering Internship / Discussion"
                      className="w-full px-3.5 py-2 rounded-sm bg-[#07090f] border border-white/10 text-slate-200 placeholder-slate-600 text-xs sm:text-sm font-mono focus:outline-none focus:border-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Describe your inquiry, project, or role..."
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#07090f] border border-white/10 text-slate-200 placeholder-slate-600 text-xs sm:text-sm font-mono focus:outline-none focus:border-white/20 resize-none"
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-slate-500">
                    Opens directly in your email client.
                  </span>

                  <button
                    type="submit"
                    disabled={isTransmitting || !message.trim()}
                    className="w-full sm:w-auto px-5 py-2 rounded-sm bg-[#f0f2f5] text-[#0a0c12] font-medium text-xs font-mono flex items-center justify-center gap-2 hover:bg-white transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-40 shadow-md"
                  >
                    {isTransmitting ? (
                      <span>Dispatching...</span>
                    ) : transmitted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Dispatched</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </TornPaperBox>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/6 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Asmit Rawat. Local-first architectures.
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Asmitrawat4078" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </a>
            <span>•</span>
            <span>Greater Noida, India</span>
          </div>
        </div>

      </div>
    </section>
  );
};
