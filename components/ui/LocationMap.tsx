'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CENTER = { x: 200, y: 200 };

const RADIAL_LINES = [
  { id: 'line-airport', x: 70, y: 90, labelX: 40, labelY: 75 },
  { id: 'line-station', x: 55, y: 200, labelX: 25, labelY: 200 },
  { id: 'line-shops', x: 90, y: 310, labelX: 55, labelY: 325 },
  { id: 'line-beach', x: 130, y: 330, labelX: 105, labelY: 350 },
  { id: 'line-olympic', x: 310, y: 310, labelX: 330, labelY: 330 },
  { id: 'line-rosa', x: 330, y: 80, labelX: 350, labelY: 65 },
];

export default function LocationMap() {
  const t = useTranslations('location');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const lines = svg.querySelectorAll<SVGPathElement>('[data-radial-line]');

    if (prefersReducedMotion) {
      lines.forEach((line) => {
        line.style.strokeDashoffset = '0';
      });
      return;
    }

    lines.forEach((line) => {
      const length = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.12,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      data-location-map
      className="location-map-clip relative mx-auto w-full max-w-2xl overflow-hidden bg-white/60 opacity-0 shadow-[0_8px_32px_rgba(11,22,40,0.06)]"
      style={{ transform: 'scale(0.95)' }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="h-auto w-full"
        aria-label={t('mapLabel')}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blueprint grid */}
        <defs>
          <pattern
            id="location-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(11,22,40,0.06)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#location-grid)" />
        <rect width="400" height="400" fill="#F6F5F2" opacity="0.85" />

        {/* Stylized roads */}
        <path
          d="M0,180 L400,180 M0,260 L400,260 M120,0 L120,400 M280,0 L280,400"
          stroke="rgba(11,22,40,0.08)"
          strokeWidth="2"
        />
        <path
          d="M40,120 C120,140 200,100 280,130 S360,160 400,140"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2.5"
          opacity="0.7"
        />
        <path
          d="M0,220 C80,240 160,200 240,230 S360,250 400,220"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M180,0 C200,80 220,160 200,240 S180,320 190,400"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          opacity="0.4"
        />

        {/* Radial lines from guest house */}
        {RADIAL_LINES.map((line) => (
          <path
            key={line.id}
            data-radial-line
            d={`M${CENTER.x},${CENTER.y} L${line.x},${line.y}`}
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        ))}

        {/* Destination dots */}
        {RADIAL_LINES.map((line) => (
          <circle
            key={`dot-${line.id}`}
            cx={line.x}
            cy={line.y}
            r="5"
            fill="var(--deep-navy)"
            opacity="0.35"
          />
        ))}

        {/* Guest house pin */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="22"
          fill="var(--gold)"
          stroke="white"
          strokeWidth="3"
        />
        <path
          d="M200,192 L194,198 L194,206 L206,206 L206,198 Z M200,194 L204,198 L204,204 L196,204 L196,198 Z"
          fill="white"
        />

        <text
          x={CENTER.x}
          y={CENTER.y + 38}
          textAnchor="middle"
          className="fill-deep-navy font-body text-[10px] font-medium"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('mapLabel')}
        </text>
      </svg>
    </div>
  );
}