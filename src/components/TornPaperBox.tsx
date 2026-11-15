import type { ReactNode } from 'react';

interface TornPaperBoxProps {
  children: ReactNode;
  className?: string;
  tornTop?: boolean;
  tornBottom?: boolean;
  hasTape?: boolean;
  tapePosition?: 'top-left' | 'top-right' | 'both' | 'center';
  driftVariant?: 'slow' | 'reverse' | 'fast' | 'none';
  stamp?: string;
  hasPerforation?: boolean;
  bgDarkness?: 'default' | 'deeper' | 'parchment';
}

export const TornPaperBox = ({
  children,
  className = '',
  tornTop = true,
  tornBottom = true,
  hasTape = false,
  tapePosition = 'top-right',
  driftVariant = 'none',
  stamp,
  hasPerforation = false,
  bgDarkness = 'default',
}: TornPaperBoxProps) => {
  // Determine floating animation class
  let floatClass = '';
  if (driftVariant === 'slow') floatClass = 'animate-paper-float';
  else if (driftVariant === 'reverse') floatClass = 'animate-paper-float-reverse';
  else if (driftVariant === 'fast') floatClass = 'animate-paper-float-fast';

  // Background color mapping
  const bgColor = 
    bgDarkness === 'deeper' ? '#090b12' : 
    bgDarkness === 'parchment' ? '#111420' : '#0d1019';

  return (
    <div className={`relative group ${floatClass} ${className}`}>
      {/* Tape Accents */}
      {hasTape && (tapePosition === 'top-left' || tapePosition === 'both') && (
        <div className="washi-tape washi-tape-tl" />
      )}
      {hasTape && (tapePosition === 'top-right' || tapePosition === 'both') && (
        <div className="washi-tape washi-tape-tr" />
      )}
      {hasTape && tapePosition === 'center' && (
        <div className="washi-tape washi-tape-center" />
      )}

      {/* Torn Top Edge Silhouette */}
      {tornTop && (
        <div className="relative w-full overflow-hidden -mb-[1px] leading-none pointer-events-none select-none z-10">
          <svg
            viewBox="0 0 1200 18"
            preserveAspectRatio="none"
            className="w-full h-3.5 block"
            style={{ filter: 'drop-shadow(0 -1px 1px rgba(255, 255, 255, 0.08))' }}
          >
            {/* Torn paper fiber stroke */}
            <path
              d="M0,18 L0,8 Q25,2 50,7 T100,3 T150,9 T200,4 T250,8 T300,2 T350,7 T400,3 T450,9 T500,4 T550,8 T600,2 T650,7 T700,3 T750,9 T800,4 T850,8 T900,2 T950,7 T1000,3 T1050,8 T1100,4 T1150,7 T1200,2 L1200,18 Z"
              fill={bgColor}
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}

      {/* Main Paper Box Body */}
      <div 
        className="paper-box-base relative z-0 p-5 md:p-6 transition-all duration-300"
        style={{ backgroundColor: bgColor }}
      >
        {/* Optional Technical Catalog Stamp */}
        {stamp && (
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.07] font-mono text-[10px] tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 animate-ping inline-block" />
              {stamp}
            </span>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest">
              DOC // P-2026
            </span>
          </div>
        )}

        {/* Optional Perforation Strip */}
        {hasPerforation && <div className="paper-perforation" />}

        {/* Content */}
        {children}
      </div>

      {/* Torn Bottom Edge Silhouette */}
      {tornBottom && (
        <div className="relative w-full overflow-hidden -mt-[1px] leading-none pointer-events-none select-none z-10">
          <svg
            viewBox="0 0 1200 18"
            preserveAspectRatio="none"
            className="w-full h-3.5 block"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))' }}
          >
            {/* Torn paper fiber stroke */}
            <path
              d="M0,0 L0,10 Q25,16 50,11 T100,15 T150,9 T200,14 T250,10 T300,16 T350,11 T400,15 T450,9 T500,14 T550,10 T600,16 T650,11 T700,15 T750,9 T800,14 T850,10 T900,16 T950,11 T1000,15 T1050,10 T1100,14 T1150,11 T1200,16 L1200,0 Z"
              fill={bgColor}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
