import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { FixedBackgroundCanvas } from './components/FixedBackgroundCanvas';
import { HeroSection } from './components/HeroSection';
import { InteractiveAgentTerminal } from './components/InteractiveAgentTerminal';
import { ProjectsSection } from './components/ProjectsSection';
import { AnimationGallery } from './components/AnimationGallery';
import { SkillsRadar } from './components/SkillsRadar';
import { CreativeSpace } from './components/CreativeSpace';
import { ContactTerminal } from './components/ContactTerminal';
import { AgentCompanionBot } from './components/AgentCompanionBot';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    // Initialize Lenis smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-[#ededed] selection:bg-slate-700 selection:text-white">
      {/* 1. Global Fixed 3D Animated Background Canvas (Sculpted Grain Face with Vector Flow) */}
      <FixedBackgroundCanvas />

      {/* 2. Top Navigation Header */}
      <Navbar />

      {/* 3. Scrolling Components Layer */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Interactive Agent OS Sandbox Simulator */}
        <InteractiveAgentTerminal />

        {/* 5 Engineered Projects Bento Grid */}
        <ProjectsSection />

        {/* Interactive Physics & Animation Gallery */}
        <AnimationGallery />

        {/* Technical Proficiencies & Skills Matrix */}
        <SkillsRadar />

        {/* Creative Space (Poetry, Cinema, Anime, Fitness) */}
        <CreativeSpace />

        {/* Contact Transmission Gateway */}
        <ContactTerminal />
      </main>

      {/* 4. Interactive Floating AI Guide Companion */}
      <AgentCompanionBot />
    </div>
  );
}

export default App;
