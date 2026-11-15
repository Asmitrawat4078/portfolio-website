import { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { 
  X, 
  Send, 
  ChevronRight,
  Bot
} from 'lucide-react';
import { TornPaperBox } from './TornPaperBox';
import { animationManager } from '../utils/animationEvents';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  action?: {
    label: string;
    targetId: string;
  };
}

export const AgentCompanionBot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hello! I'm Asmit's Agent OS guide. Ask me anything about his projects, skills, or let me guide you through the portfolio.`,
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    sound.playBlip(750, 0.03);
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply: Message = { sender: 'bot', text: '' };

      if (lower.includes('tour') || lower.includes('guide')) {
        reply = {
          sender: 'bot',
          text: `Starting portfolio tour! First stop: The Agent OS live security gateway. Let's inspect the local policy enforcement.`,
          action: { label: 'Go to Sandbox Simulator', targetId: 'terminal-sandbox' }
        };
        setTimeout(() => {
          document.getElementById('terminal-sandbox')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);

      } else if (lower.includes('agent os') || lower.includes('flagship') || lower.includes('automation')) {
        reply = {
          sender: 'bot',
          text: `Agent OS is an open-source, local-first AI desktop automation platform under Release Candidate 5 testing. It enforces strict DLP, process isolation, structured JSON action parsing, and snapshot rollbacks.`,
          action: { label: 'Inspect Agent OS Terminal', targetId: 'terminal-sandbox' }
        };

      } else if (lower.includes('project') || lower.includes('work') || lower.includes('built')) {
        reply = {
          sender: 'bot',
          text: `Asmit has built 5 engineered systems: Agent OS (Desktop AI), Jarvis (Local Assistant), NER CognitiveCare (Smart India Hackathon), APIx (Airfare Price Index), and a Sports Tournament Management backend in C.`,
          action: { label: 'Explore 5 Projects', targetId: 'projects-grid' }
        };

      } else if (lower.includes('jarvis')) {
        reply = {
          sender: 'bot',
          text: `Jarvis is a modular local AI assistant powered by Ollama, Mistral 7B, LLaVA 7B for vision, Whisper for voice, and ChromaDB for semantic recall. Everything runs on local CUDA 12.4 with zero cloud egress.`,
          action: { label: 'View Projects Grid', targetId: 'projects-grid' }
        };

      } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('language') || lower.includes('python')) {
        reply = {
          sender: 'bot',
          text: `Asmit specializes in Python, C, C++, Java (IBM Certified CEJAVA1N), HTML/CSS (Advanced), Systems Security (DLP, sandboxing, process isolation), Docker, FastAPI, and Pytest.`,
          action: { label: 'View Skills Matrix', targetId: 'skills-matrix' }
        };

      } else if (lower.includes('animat') || lower.includes('gallery') || lower.includes('physics') || lower.includes('black hole') || lower.includes('torus') || lower.includes('wave') || lower.includes('morph')) {
        if (lower.includes('black hole') || lower.includes('singularity')) {
          animationManager.setPreset('blackhole');
        } else if (lower.includes('torus') || lower.includes('knot')) {
          animationManager.setPreset('torusknot');
        } else if (lower.includes('wave') || lower.includes('fluid')) {
          animationManager.setPreset('wavegrid');
        } else if (lower.includes('dna') || lower.includes('helix')) {
          animationManager.setPreset('dna');
        } else if (lower.includes('face')) {
          animationManager.setPreset('face');
        }
        reply = {
          sender: 'bot',
          text: `Welcome to the Physics & Animation Gallery! You can experience 7 distinct mathematical exhibits: 3D MediaPipe Face Mask, Cosmic Singularity Black Hole, Torus Knot (3, 7), Harmonic Fluid Wavefield, DNA Helix, Tactile Paper Tearing, and Agent OS DAG Flow.`,
          action: { label: 'Explore Animation Gallery', targetId: 'animation-gallery' }
        };
        setTimeout(() => {
          document.getElementById('animation-gallery')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);

      } else if (lower.includes('cert') || lower.includes('ibm') || lower.includes('college') || lower.includes('degree') || lower.includes('gpa') || lower.includes('score')) {
        reply = {
          sender: 'bot',
          text: `Asmit is currently in his 3rd year (5th semester) studying B.Tech CSE at Greater Noida College of Technology (AKTU, 5.62 SGPA). He holds an IBM certification in Java Fundamentals (Certificate CEJAVA1N).`,
          action: { label: 'Inspect Verified Credentials', targetId: 'skills-matrix' }
        };

      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('github')) {
        reply = {
          sender: 'bot',
          text: `You can reach Asmit directly at asmitrawat4078@gmail.com, or check out his 13 repositories on GitHub @Asmitrawat4078. He is open for software development and systems internships.`,
          action: { label: 'Send Direct Message', targetId: 'contact-transmission' }
        };

      } else {
        reply = {
          sender: 'bot',
          text: `I can help you navigate Asmit's portfolio. Would you like a guided tour of his projects, an explanation of Agent OS security, or his verified skills and academic record?`,
          action: { label: 'Start Guided Tour', targetId: 'terminal-sandbox' }
        };
      }

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
      sound.playSuccess();
    }, 550);
  };

  const handleActionClick = (targetId: string) => {
    sound.playBlip(750, 0.04);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Bot Chat Drawer wrapped in Torn Paper Box */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 shadow-2xl relative">
          <TornPaperBox
            hasTape={true}
            tapePosition="top-right"
            stamp="AI COMPANION // LOCAL AGENT"
            hasPerforation={true}
            bgDarkness="deeper"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/8 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-medium">Asmit's Site Agent</span>
              </div>
              <button
                onClick={() => {
                  sound.playBlip(600, 0.04);
                  setIsOpen(false);
                }}
                className="p-1 rounded-sm text-slate-400 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick suggested chips */}
            <div className="py-2 border-b border-white/6 flex flex-wrap gap-1.5 text-[11px] font-mono">
              <button
                onClick={() => handleSend('Show animation gallery')}
                className="px-2 py-0.5 rounded-sm bg-[#161a26] text-sky-300 hover:text-white hover:bg-[#1e2333] transition-colors cursor-pointer border border-sky-500/20"
              >
                Animation Vault
              </button>
              <button
                onClick={() => handleSend('Take me on a tour')}
                className="px-2 py-0.5 rounded-sm bg-[#161a26] text-slate-300 hover:text-white hover:bg-[#1e2333] transition-colors cursor-pointer border border-white/6"
              >
                Guided tour
              </button>
              <button
                onClick={() => handleSend('What is Agent OS?')}
                className="px-2 py-0.5 rounded-sm bg-[#161a26] text-slate-300 hover:text-white hover:bg-[#1e2333] transition-colors cursor-pointer border border-white/6"
              >
                Agent OS info
              </button>
              <button
                onClick={() => handleSend('Show skills & certs')}
                className="px-2 py-0.5 rounded-sm bg-[#161a26] text-slate-300 hover:text-white hover:bg-[#1e2333] transition-colors cursor-pointer border border-white/6"
              >
                IBM cert
              </button>
            </div>

            {/* Messages Area */}
            <div className="p-3 font-mono text-xs max-h-64 overflow-y-auto flex flex-col gap-2.5 bg-[#07090f] rounded-sm my-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-sm p-2.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1b2234] text-slate-100 border border-white/10'
                        : 'bg-[#10131c] text-slate-300 border border-white/6'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action!.targetId)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 bg-sky-950/40 border border-sky-500/20 px-2 py-0.5 rounded-sm cursor-pointer transition-colors"
                    >
                      <span>{msg.action.label}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="text-slate-500 text-[11px] font-mono animate-pulse">
                  Agent OS is reasoning...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="pt-2 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the agent anything..."
                className="flex-1 bg-[#07090f] border border-white/8 rounded-sm px-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-white/20"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-1.5 rounded-sm bg-[#171b26] hover:bg-[#202636] border border-white/8 text-slate-200 transition-colors disabled:opacity-30 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </TornPaperBox>
        </div>
      )}

      {/* Floating Toggle Button with Passive Float Animation */}
      <button
        onClick={() => {
          sound.playBlip(800, 0.04);
          setIsOpen(!isOpen);
        }}
        className="px-3.5 py-2.5 rounded-sm bg-[#10131e]/95 backdrop-blur-md hover:bg-[#161a29] border border-white/14 text-slate-200 text-xs font-mono shadow-2xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer group animate-paper-float-fast"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <Bot className="w-3.5 h-3.5 text-sky-400" />
        <span className="font-medium group-hover:text-white">AI Site Guide</span>
      </button>
    </div>
  );
};
