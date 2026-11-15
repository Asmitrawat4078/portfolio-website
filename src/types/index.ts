export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Systems' | 'Personal AI' | 'HealthTech' | 'Data & Indexing' | 'Algorithmic';
  status: string;
  role: string;
  description: string;
  technologies: string[];
  metrics: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    rating?: number; // out of 5
    note?: string;
    icon?: string;
  }[];
}

export interface CreativeHobby {
  title: string;
  category: string;
  description: string;
  icon: string;
  tags: string[];
}
