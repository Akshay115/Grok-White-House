'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icon in bundlers (not needed with custom icons but safe)
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Custom sea-teal styled pin with pulse animation
const createLocationIcon = () => {
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div class="pin-wrapper">
        <div class="pin-core" style="background:#5ba3b8; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.2);"></div>
        <div class="pin-pulse" style="border-color:#5ba3b8;"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -26],
  });
};

const pinIcon = createLocationIcon();

// Map fly controller for interactivity
function MapFlyController({ selected }: { selected?: string }) {
  const map = useMap();

  useEffect(() => {
    if (!selected || !map) return;

    const locations: Record<string, [number, number]> = {
      airport: [43.4493, 39.9568],
      station: [43.431, 39.922],
      beach: [43.412, 39.968],
      rosa: [43.682, 40.204],
    };

    const coords = locations[selected];
    if (coords) {
      map.flyTo(coords, 12, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
      // Open popup after fly (slight delay)
      setTimeout(() => {
        const marker = (map as any)._layers 
          ? Object.values((map as any)._layers).find((l: any) => l.getLatLng && l.getLatLng().lat === coords[0]) 
          : null;
        if (marker && (marker as any).openPopup) (marker as any).openPopup();
      }, 1300);
    }
  }, [selected, map]);

  return null;
}

interface LocationMapProps {
  selected?: string;
  onMarkerClick?: (key: string) => void;
}

export default function LocationMap({ selected, onMarkerClick }: LocationMapProps) {
  const t = useTranslations('location');

  // Main locations with accurate-ish coords for Adler/Sochi area
  const locations = [
    {
      key: 'airport',
      position: [43.4493, 39.9568] as [number, number],
      label: t('destinations.airport.label'),
      time: '7',
      description: 'Международный аэропорт Сочи (Адлер)',
      freeTransfer: true,
    },
    {
      key: 'station',
      position: [43.431, 39.922] as [number, number],
      label: t('destinations.station.label'),
      time: '12',
      description: 'Железнодорожный вокзал Адлер',
      freeTransfer: true,
    },
    {
      key: 'beach',
      position: [43.412, 39.968] as [number, number],
      label: t('destinations.beach.label'),
      time: '10',
      description: 'Пляжи и набережная Сириуса',
      freeTransfer: true,
    },
    {
      key: 'rosa',
      position: [43.682, 40.204] as [number, number],
      label: t('destinations.rosa.label'),
      time: '30',
      description: 'Красная Поляна • Роза Хутор',
      freeTransfer: false,
    },
  ];

  // Center on the villa / Adler area
  const center: [number, number] = [43.4644, 39.9692];

  return (
    <div
      data-location-map
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-warm-gray/10 bg-white shadow-[0_20px_60px_-15px_rgb(0,0,0,0.08)]"
      style={{ height: '520px' }}
    >
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyController selected={selected} />

        {locations.map((loc) => (
          <Marker
            key={loc.key}
            position={loc.position}
            icon={pinIcon}
            eventHandlers={{
              click: () => {
                onMarkerClick?.(loc.key);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="min-w-[220px] p-1">
                <div className="font-medium text-base tracking-tight text-charcoal mb-1">
                  {loc.label}
                </div>
                <div className="text-sm text-warm-gray mb-2">{loc.description}</div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-light text-sea-teal leading-none">
                    {loc.time}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-warm-gray-light">{t('unit')}</span>
                </div>
                {loc.freeTransfer && (
                  <div className="mt-2 inline-flex items-center text-[10px] font-medium tracking-[0.5px] uppercase text-sea-teal bg-sea-teal/10 px-2 py-0.5 rounded">
                    {t('transfer.heading')}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Subtle label overlay */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-medium tracking-[0.5px] text-charcoal/70 rounded pointer-events-none">
        {t('mapLabel')}
      </div>

      <style jsx global>{`
        .custom-map-pin {
          background: transparent;
          border: none;
        }
        .pin-wrapper {
          position: relative;
          width: 28px;
          height: 28px;
        }
        .pin-core {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }
        .pin-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 28px;
          height: 28px;
          border-radius: 9999px;
          border: 2px solid;
          animation: map-pin-pulse 2.2s cubic-bezier(0.23, 1, 0.32, 1) infinite;
          opacity: 0.4;
        }
        @keyframes map-pin-pulse {
          0% { transform: scale(1); opacity: 0.45; }
          70% { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.15);
          font-family: var(--font-body);
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
}