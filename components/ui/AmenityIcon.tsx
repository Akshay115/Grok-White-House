'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import {
  Car,
  Coffee,
  Home,
  Map,
  Plane,
  Shirt,
  TrainFront,
  Utensils,
  Waves,
  Wind,
  Wifi,
  type LucideIcon,
} from 'lucide-react';

export const AMENITY_ICONS: Record<string, LucideIcon> = {
  heatedPools: Waves,
  parking: Car,
  kitchen: Utensils,
  breakfast: Coffee,
  airportTransfer: Plane,
  trainTransfer: TrainFront,
  beachTransfer: Waves,
  excursions: Map,
  ac: Wind,
  wifi: Wifi,
  laundry: Shirt,
  housekeeping: Home,
};

type AmenityIconProps = {
  label: string;
  itemKey: string;
  gridClass?: string;
};

export default function AmenityIcon({
  label,
  itemKey,
  gridClass = '',
}: AmenityIconProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const Icon = AMENITY_ICONS[itemKey];

  const handleEnter = () => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      scale: 1.15,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  const handleLeave = () => {
    if (!iconRef.current) return;
    gsap.to(iconRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  if (!Icon) return null;

  return (
    <div
      ref={cardRef}
      data-amenity-card
      className={`amenity-card group mx-auto flex flex-col items-center opacity-0 ${gridClass}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        ref={iconRef}
        className="amenity-icon-wrap flex items-center justify-center"
      >
        <Icon
          className="h-7 w-7 text-gold transition-colors duration-300 group-hover:text-white"
          strokeWidth={1.5}
        />
      </div>
      <p
        className="mt-sm text-center font-body text-[0.85rem] font-medium leading-[1.4] transition-colors duration-300 group-hover:text-white"
        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
      >
        {label}
      </p>
    </div>
  );
}