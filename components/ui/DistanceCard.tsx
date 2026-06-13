'use client';

import {
  Building2,
  Mountain,
  Plane,
  TrainFront,
  Trophy,
  Waves,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  airport: Plane,
  station: TrainFront,
  beach: Waves,
  rosa: Mountain,
  olympic: Trophy,
  shops: Building2,
};

type DistanceCardProps = {
  destKey: keyof typeof ICONS;
  time: string;
  unit: string;
  label: string;
  className?: string;
};

export default function DistanceCard({
  destKey,
  time,
  unit,
  label,
  className = '',
}: DistanceCardProps) {
  const Icon = ICONS[destKey];

  return (
    <article
      data-distance-card
      className={`distance-card opacity-0 ${className}`}
    >
      <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
      <div className="mt-xs flex items-baseline gap-xs">
        <span className="font-display text-[2.2rem] font-light italic leading-none text-deep-navy">
          {time}
        </span>
        <span className="font-body text-[0.8rem] text-charcoal/50">{unit}</span>
      </div>
      <p className="mt-xs font-body text-[0.85rem] font-medium text-charcoal">
        {label}
      </p>
    </article>
  );
}