import type { Project, SkillCategory, CreativeHobby } from '../types';

export const PERSONAL_INFO = {
  name: 'Asmit Rawat',
  title: 'Systems & Local-First AI Developer',
  shortBio: 'B.Tech CSE student at Greater Noida College of Technology (AKTU) focused on local AI platforms, desktop automation, and secure system sandboxing.',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science and Engineering (CSE)',
  academicYear: '3rd Year (5th Semester)',
  college: 'Greater Noida College of Technology (GNCT)',
  university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  location: 'Greater Noida, Uttar Pradesh, India',
  graduationYear: '2028',
  academicScore: '5.62 SGPA',
  email: 'asmitrawat4078@gmail.com',
  github: 'https://github.com/Asmitrawat4078',
  githubUsername: 'Asmitrawat4078',
  status: 'Open to Software Engineering & Systems Internships',
};

export const PROJECTS: Project[] = [
  {
    id: 'agent-os',
    title: 'Agent OS',
    tagline: 'Local-First AI Desktop Automation Platform',
    category: 'AI & Systems',
    status: 'In Active Development (RC5)',
    role: 'Project Developer & System Architect',
    description:
      'An open-source, local-first AI desktop automation platform designed to help users interact with and operate operating system resources through structured AI agent actions under strict security guarantees.',
    technologies: [
      'Python',
      'Model Context Protocol (MCP)',
      'Model Routing',
      'Structured Action Parsing',
      'Data Loss Prevention (DLP)',
      'Process Isolation & Sandboxing',
      'Windows APIs',
      'Pytest',
      'Git'
    ],
    metrics: [
      'Physical desktop acceptance testing across Release Candidate 5 (RC5)',
      'Deterministic policy enforcement and shell-command rejection gateway',
      'Snapshot-based state capture with rollback capabilities'
    ],
    highlights: [
      'Structured Action Parsing that decomposes model output into strict typed schemas before execution.',
      'Data Loss Prevention (DLP) gateway preventing unauthorized outbound data egress.',
      'Process Sandboxing restricting sub-process privilege escalation and protecting system files.',
      'Agent Session lifecycle management with snapshot rollback on interrupted tasks.'
    ],
    githubUrl: 'https://github.com/Asmitrawat4078',
    featured: true
  },
  {
    id: 'jarvis',
    title: 'Jarvis',
    tagline: 'Modular Local-First Personal AI Assistant',
    category: 'Personal AI',
    status: 'In Development / Planning',
    role: 'Independent Developer & System Architect',
    description:
      'A personal AI assistant designed with a local-first architecture to provide voice assistance, computer interaction, proactive assistance, and contextual memory without external cloud dependency.',
    technologies: [
      'Python 3.11',
      'TypeScript',
      'Ollama',
      'Mistral 7B',
      'LLaVA 7B',
      'Whisper',
      'pyttsx3',
      'OpenCV',
      'PyAutoGUI',
      'Redis',
      'ChromaDB / FAISS',
      'CUDA 12.4'
    ],
    metrics: [
      'Zero external cloud egress: All model inference scheduled on local silicon',
      'Multi-modal pipeline integrating Whisper (audio), LLaVA (vision), and Mistral (reasoning)',
      'Open-source codebase on GitHub: JARVIS-STUDIO & JARVIS-JULES'
    ],
    highlights: [
      'Local model routing utilizing Ollama and CUDA 12.4 acceleration.',
      'Vector memory indexing powered by ChromaDB / FAISS for long-term user recall.',
      'Computer vision parsing using OpenCV and desktop automation via PyAutoGUI.'
    ],
    githubUrl: 'https://github.com/Asmitrawat4078/JARVIS-STUDIO',
    featured: true
  },
  {
    id: 'ner-cognitive-care',
    title: 'NER CognitiveCare',
    tagline: 'Interactive Cognitive Health Platform (Smart India Hackathon)',
    category: 'HealthTech',
    status: 'SIH Project Development',
    role: 'Team Member (Development & Coordination)',
    description:
      'A cognitive-health web application designed around accessible interactive activities and sensory games for individuals experiencing cognitive difficulties, including dementia-related challenges. Built for accessibility without relying on cloud AI.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'SVG Animation',
      'Web Audio API',
      'Web Speech API',
      'IndexedDB'
    ],
    metrics: [
      'Developed for Smart India Hackathon (SIH) team submission',
      'Collaborative build with Aditi, Preeti, Priti, Aastika, and Asmit',
      '100% Client-side operation utilizing IndexedDB and Web Audio'
    ],
    highlights: [
      'Adaptive sensory audio-visual activities using native Web Audio and Speech APIs.',
      'Offline-first client storage via IndexedDB with zero cloud dependency.',
      'Multi-dashboard role architecture for participants and caregivers.'
    ],
    githubUrl: 'https://github.com/Asmitrawat4078',
    featured: true
  },
  {
    id: 'apix-airfare',
    title: 'APIx Airfare Price Index',
    tagline: 'Econometric Airfare Price Index Calculation Engine',
    category: 'Data & Indexing',
    status: 'In Progress / Research',
    role: 'Project Developer',
    description:
      'A software project focused on calculating and comparing airfare price indices across routes and booking windows using established econometric index methodologies.',
    technologies: [
      'Python',
      'FastAPI',
      'Streamlit',
      'PostgreSQL',
      'Docker',
      'Jevons Index',
      'GEKS-Jevons',
      'Hedonic Methods'
    ],
    metrics: [
      'Public repository on GitHub: apix-airfare-index',
      'Multilateral GEKS-Jevons index computation for transitivity across price series',
      'Containerized with Docker for reproducible statistical runs'
    ],
    highlights: [
      'FastAPI service endpoints calculating price changes over booking lead times.',
      'Interactive analytical exploration views built with Streamlit.'
    ],
    githubUrl: 'https://github.com/Asmitrawat4078/apix-airfare-index',
    featured: false
  },
  {
    id: 'sports-tournament',
    title: 'Sports Tournament Management System',
    tagline: 'Algorithmic Fixture Scheduling & Bracket System',
    category: 'Algorithmic',
    status: 'Completed Core / Open Source',
    role: 'Project Developer',
    description:
      'A software project engineered to handle competitive tournament fixtures, score calculations, team rankings, and bracket generation using optimized C data structures and algorithms.',
    technologies: [
      'C',
      'JavaScript',
      'Data Structures',
      'Algorithmic Problem-Solving',
      'Git'
    ],
    metrics: [
      'Public repositories on GitHub: sports-managment-system-new (C) & Sports-Tournament-Management (JS)',
      'Algorithmic round-robin fixture matrix implementation with O(N²) complexity'
    ],
    highlights: [
      'Direct low-level memory allocation and structured data organization in C.',
      'Deterministic bracket computation and ranking logic.'
    ],
    githubUrl: 'https://github.com/Asmitrawat4078/sports-managment-system-new',
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Systems & Security Concepts',
    description: 'Application security, isolation, and policy enforcement based on Agent OS work',
    skills: [
      { name: 'Process Isolation & Sandboxing', level: 'Intermediate', rating: 3, note: 'Sub-process access restrictions' },
      { name: 'Data Loss Prevention (DLP)', level: 'Intermediate', rating: 3, note: 'Outbound egress inspection' },
      { name: 'Secure Execution Architecture', level: 'Intermediate', rating: 3, note: 'Structured intent validation' },
      { name: 'Windows APIs & Automation', level: 'Intermediate', rating: 3, note: 'System-level integration' },
      { name: 'Model Context Protocol (MCP)', level: 'Intermediate', rating: 3, note: 'Agent tool routing protocol' },
      { name: 'Policy Enforcement', level: 'Intermediate', rating: 3, note: 'Shell command rejection' }
    ]
  },
  {
    title: 'Programming Languages',
    description: 'Self-assessed proficiencies across compiled and scripting languages',
    skills: [
      { name: 'HTML', level: 'Advanced (Self-rated)', rating: 5, note: 'Self-assessed 5/5' },
      { name: 'CSS', level: 'Advanced (Self-rated)', rating: 5, note: 'Self-assessed 5/5' },
      { name: 'Python', level: 'Intermediate', rating: 3, note: 'Primary language for AI & backend' },
      { name: 'Java', level: 'Beginner (IBM Certified)', rating: 2, note: 'IBM Course Certificate CEJAVA1N' },
      { name: 'C', level: 'Beginner', rating: 2, note: 'Used in Sports Tournament backend' },
      { name: 'C++', level: 'Beginner', rating: 1, note: 'Basic data structures & syntax' },
      { name: 'JavaScript', level: 'Beginner', rating: 2, note: 'Used in SIH project & UI' }
    ]
  },
  {
    title: 'AI, Automation & Tools',
    description: 'Local models, computer vision, and backend libraries',
    skills: [
      { name: 'Git & GitHub Workflows', level: 'Intermediate', rating: 3, note: '13 public repositories on GitHub' },
      { name: 'FastAPI', level: 'Intermediate', rating: 3, note: 'API services for APIx' },
      { name: 'Docker', level: 'Intermediate', rating: 3, note: 'Containerized deployment' },
      { name: 'Ollama & Local LLMs', level: 'Intermediate', rating: 3, note: 'Mistral 7B & LLaVA 7B local hosting' },
      { name: 'OpenCV', level: 'Intermediate', rating: 3, note: 'Screen capture & visual parsing' },
      { name: 'PyAutoGUI', level: 'Intermediate', rating: 3, note: 'Desktop automation control' },
      { name: 'Pytest', level: 'Intermediate', rating: 3, note: 'Automated test suites' },
      { name: 'PostgreSQL', level: 'Intermediate', rating: 3, note: 'Relational data indexing' },
      { name: 'Streamlit', level: 'Intermediate', rating: 3, note: 'Analytical web applications' },
      { name: 'ChromaDB / FAISS', level: 'Beginner', rating: 2, note: 'Vector memory indexing' },
      { name: 'CUDA 12.4', level: 'Beginner', rating: 2, note: 'GPU acceleration' },
      { name: 'Redis', level: 'Beginner', rating: 2, note: 'Caching & message brokers' }
    ]
  }
];

export const CREATIVE_INTERESTS: CreativeHobby[] = [
  {
    title: 'Creative Writing & Poetry',
    category: 'Creative Expression',
    description: 'Writing reflective poetry and exploring themes of cognition, rhythm, and technology.',
    icon: 'Feather',
    tags: ['Poetry', 'Reflective Writing', 'Composition']
  },
  {
    title: 'Cinematic Photography',
    category: 'Visual Arts',
    description: 'Exploring urban angles, light composition, and visual framing with post-processing.',
    icon: 'Camera',
    tags: ['Framing', 'Lighting', 'Image Editing']
  },
  {
    title: 'Anime & Gaming',
    category: 'Personal Interests',
    description: 'Appreciation for narrative world-building, interactive storytelling, and game mechanics.',
    icon: 'Sparkles',
    tags: ['World Building', 'Gaming', 'Visual Aesthetics']
  },
  {
    title: 'Gym & Physical Fitness',
    category: 'Discipline',
    description: 'Daily discipline, strength training, and building personal endurance.',
    icon: 'Dumbbell',
    tags: ['Discipline', 'Consistency', 'Fitness']
  }
];
