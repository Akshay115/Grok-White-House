'use client';

import { useEffect, useId, useRef } from 'react';
import {
  BACKGROUND_FRAGMENTS,
  HERO_LAYERS,
  MORPH_SEQUENCE,
  PATH_ALIYEV,
  PATH_ALIYEV_FILL,
  PATH_AQUATICS_FOOTER,
  PATH_DIVIDER_STROKE,
  PATH_FOOTER_ACCENT,
  pathMorphCycle,
} from '@/lib/hadid-paths';
import { setupHadidAnimations } from '@/lib/hadid-animation';

export type HadidFlowVariant =
  | 'hero'
  | 'section-divider'
  | 'background'
  | 'footer';

export type HadidFlowColor = 'white' | 'gold' | 'navy' | 'sea-teal';

export type HadidFlowProps = {
  variant?: HadidFlowVariant;
  color?: HadidFlowColor;
  opacity?: number;
  animate?: boolean;
  /** Background color for section-divider fill (incoming section) */
  fillColor?: string;
  /** @deprecated Use `animate` */
  morph?: boolean;
  className?: string;
};

const COLOR_MAP: Record<HadidFlowColor, string> = {
  white: 'var(--white)',
  gold: 'var(--gold)',
  navy: 'var(--deep-navy)',
  'sea-teal': 'var(--sea-teal)',
};

const VARIANT_LAYOUT = {
  hero: {
    viewBox: '0 0 1440 900',
    preserveAspectRatio: 'xMidYMid slice' as const,
    wrapper: 'absolute inset-0 overflow-hidden',
    height: undefined,
    scrollRotate: true,
    drift: true,
  },
  'section-divider': {
    viewBox: '0 0 1440 120',
    preserveAspectRatio: 'none' as const,
    wrapper: 'absolute inset-x-0 overflow-hidden',
    height: 'h-[120px]',
    scrollRotate: false,
    drift: false,
  },
  background: {
    viewBox: '0 0 1440 900',
    preserveAspectRatio: 'xMidYMid slice' as const,
    wrapper: 'absolute inset-0 overflow-hidden',
    height: undefined,
    scrollRotate: false,
    drift: true,
  },
  footer: {
    viewBox: '0 0 1440 200',
    preserveAspectRatio: 'none' as const,
    wrapper: 'absolute inset-x-0 overflow-hidden',
    height: 'h-[200px]',
    scrollRotate: false,
    drift: false,
  },
};

function HeroHadidFlow({
  color,
  opacity,
  animate,
  className,
}: Required<Pick<HadidFlowProps, 'color' | 'opacity' | 'animate' | 'className'>>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const galaxyRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const layerPaths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    const galaxy = galaxyRef.current;
    const paths = galaxy ? [...layerPaths, galaxy] : layerPaths;
    if (!container || !paths.length) return;

    return setupHadidAnimations({
      container,
      paths,
      pathSequences: [
        ...HERO_LAYERS.map((layer) => pathMorphCycle(layer.path)),
        ...(galaxy ? [Array.from(MORPH_SEQUENCE)] : []),
      ],
      animate,
      scrollRotate: true,
      drift: true,
    });
  }, [animate]);

  const strokeColor = COLOR_MAP[color];

  return (
    <div
      ref={containerRef}
      className={`hadid-flow hadid-flow--hero pointer-events-none ${VARIANT_LAYOUT.hero.wrapper} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={VARIANT_LAYOUT.hero.viewBox}
        preserveAspectRatio={VARIANT_LAYOUT.hero.preserveAspectRatio}
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0, 40)">
          {HERO_LAYERS.map((layer, index) => (
            <g key={layer.path.id} transform={layer.transform}>
              <path
                ref={(el) => {
                  pathRefs.current[index] = el;
                }}
                d={layer.path.d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={layer.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={opacity}
              />
            </g>
          ))}
        </g>
        <g transform="translate(80, 500) scale(0.7)">
          <path
            ref={galaxyRef}
            d={MORPH_SEQUENCE[0]}
            fill="none"
            stroke={strokeColor}
            strokeWidth={0.5}
            opacity={opacity * 0.6}
          />
        </g>
      </svg>
    </div>
  );
}

function SectionDividerHadidFlow({
  color,
  opacity,
  animate,
  fillColor,
  className,
}: Required<Pick<HadidFlowProps, 'color' | 'opacity' | 'animate' | 'className'>> & {
  fillColor: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    const stroke = strokeRef.current;
    if (!container || !fill || !stroke) return;

    return setupHadidAnimations({
      container,
      paths: [fill, stroke],
      pathSequences: [
        pathMorphCycle(PATH_ALIYEV_FILL),
        pathMorphCycle(PATH_DIVIDER_STROKE),
      ],
      animate,
      scrollRotate: false,
      drift: false,
    });
  }, [animate]);

  const strokeColor = COLOR_MAP[color];

  return (
    <div
      ref={containerRef}
      className={`hadid-flow hadid-flow--divider pointer-events-none ${VARIANT_LAYOUT['section-divider'].wrapper} ${VARIANT_LAYOUT['section-divider'].height} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={VARIANT_LAYOUT['section-divider'].viewBox}
        preserveAspectRatio={VARIANT_LAYOUT['section-divider'].preserveAspectRatio}
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`hadid-divider-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fillColor} stopOpacity="1" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          ref={fillRef}
          d={PATH_ALIYEV_FILL.d}
          fill={`url(#hadid-divider-${uid})`}
          opacity={1}
        />
        <path
          ref={strokeRef}
          d={PATH_DIVIDER_STROKE.d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1}
          strokeOpacity={opacity}
        />
      </svg>
    </div>
  );
}

function BackgroundHadidFlow({
  color,
  opacity,
  animate,
  className,
}: Required<Pick<HadidFlowProps, 'color' | 'opacity' | 'animate' | 'className'>>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (!container || !paths.length) return;

    return setupHadidAnimations({
      container,
      paths,
      pathSequences: paths.map(() => pathMorphCycle(PATH_ALIYEV)),
      animate,
      scrollRotate: false,
      drift: true,
    });
  }, [animate]);

  const strokeColor = COLOR_MAP[color];

  return (
    <div
      ref={containerRef}
      className={`hadid-flow hadid-flow--background pointer-events-none ${VARIANT_LAYOUT.background.wrapper} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={VARIANT_LAYOUT.background.viewBox}
        preserveAspectRatio={VARIANT_LAYOUT.background.preserveAspectRatio}
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {BACKGROUND_FRAGMENTS.map((frag, index) => (
          <g key={index} transform={frag.transform}>
            <path
              ref={(el) => {
                pathRefs.current[index] = el;
              }}
              d={frag.d}
              fill="none"
              stroke={strokeColor}
              strokeWidth={0.5}
              strokeLinecap="round"
              opacity={opacity * frag.opacity}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function FooterHadidFlow({
  color,
  opacity,
  animate,
  className,
}: Required<Pick<HadidFlowProps, 'color' | 'opacity' | 'animate' | 'className'>>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<SVGPathElement>(null);
  const accentRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sweep = sweepRef.current;
    const accent = accentRef.current;
    if (!container || !sweep || !accent) return;

    return setupHadidAnimations({
      container,
      paths: [sweep, accent],
      pathSequences: [
        pathMorphCycle(PATH_AQUATICS_FOOTER),
        pathMorphCycle(PATH_FOOTER_ACCENT),
      ],
      animate,
      scrollRotate: false,
      drift: false,
    });
  }, [animate]);

  const strokeColor = COLOR_MAP[color];

  return (
    <div
      ref={containerRef}
      className={`hadid-flow hadid-flow--footer pointer-events-none ${VARIANT_LAYOUT.footer.wrapper} ${VARIANT_LAYOUT.footer.height} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={VARIANT_LAYOUT.footer.viewBox}
        preserveAspectRatio={VARIANT_LAYOUT.footer.preserveAspectRatio}
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={sweepRef}
          d={PATH_AQUATICS_FOOTER.d}
          fill={strokeColor}
          fillOpacity={opacity}
        />
        <path
          ref={accentRef}
          d={PATH_FOOTER_ACCENT.d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={1.5}
          strokeOpacity={opacity * 0.75}
        />
      </svg>
    </div>
  );
}

export default function HadidFlow({
  variant = 'hero',
  color = 'white',
  opacity = 0.06,
  animate = true,
  fillColor = 'var(--off-white)',
  morph,
  className = '',
}: HadidFlowProps) {
  const shouldAnimate = morph ?? animate;

  switch (variant) {
    case 'hero':
      return (
        <HeroHadidFlow
          color={color}
          opacity={opacity}
          animate={shouldAnimate}
          className={className}
        />
      );
    case 'section-divider':
      return (
        <SectionDividerHadidFlow
          color={color}
          opacity={opacity}
          animate={shouldAnimate}
          fillColor={fillColor}
          className={className}
        />
      );
    case 'background':
      return (
        <BackgroundHadidFlow
          color={color}
          opacity={opacity}
          animate={shouldAnimate}
          className={className}
        />
      );
    case 'footer':
      return (
        <FooterHadidFlow
          color={color}
          opacity={opacity}
          animate={shouldAnimate}
          className={className}
        />
      );
    default:
      return null;
  }
}