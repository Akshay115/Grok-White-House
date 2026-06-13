'use client';

import { useTranslations } from 'next-intl';
import {
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';

const WHATSAPP = 'https://wa.me/79621574497';
const TELEGRAM = 'https://t.me/SochiWhiteHouse';
const VK = 'https://vk.com/sochiwhitehouse';
const YANDEX_MAPS =
  'https://yandex.ru/maps?ll=39.969182,43.464403&mode=routes&rtext=~43.464403,39.969182&z=17';

function ContactDecor() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 400 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-20,120 C80,40 180,200 280,100 S380,20 420,140"
        fill="none"
        stroke="#5BA3B8"
        strokeWidth="1.2"
        opacity="0.08"
      />
      <path
        d="M0,300 C120,220 220,380 340,280 S420,200 450,320"
        fill="none"
        stroke="#5BA3B8"
        strokeWidth="1.5"
        opacity="0.06"
      />
    </svg>
  );
}

export default function BookingContact() {
  const t = useTranslations('booking.contact');
  const phoneHref = `tel:${t('phone').replace(/\s/g, '')}`;

  return (
    <div className="relative h-full bg-white p-lg md:p-[2.25rem] rounded-l-3xl lg:rounded-l-3xl border-r border-warm-gray/10">
      {/* Subtle parametric decor (light version) */}
      <ContactDecor />

      <div className="relative z-10">
        <h3 className="font-display text-2xl font-light italic text-charcoal tracking-tight">
          {t('heading')}
        </h3>

        <div className="mt-6 space-y-4">
          {/* Phone - prominent */}
          <a 
            href={phoneHref} 
            data-analytics="phone" 
            className="group flex items-start gap-3 p-3 -mx-1 rounded-2xl hover:bg-cream transition-all active:scale-[0.985]"
          >
            <div className="mt-0.5 text-sea-teal group-hover:scale-110 transition-transform">
              <Phone className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div>
              <p className="font-body text-[0.95rem] font-medium text-charcoal">{t('phone')}</p>
              <p className="text-[0.8rem] text-warm-gray-light mt-0.5">{t('phoneLabel')}</p>
            </div>
          </a>

          {/* WhatsApp - elegant prominent button style */}
          <a 
            href={WHATSAPP} 
            data-analytics="whatsapp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-3 p-3 -mx-1 rounded-2xl border border-sea-teal/10 hover:border-sea-teal/30 hover:bg-sea-teal/5 transition-all"
          >
            <div className="text-[#25D366] group-hover:scale-110 transition-transform">
              <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div className="flex-1">
              <p className="font-body text-[0.95rem] font-medium text-charcoal">WhatsApp</p>
              <span className="text-sm text-sea-teal group-hover:underline">Message us instantly</span>
            </div>
          </a>

          {/* Telegram */}
          <a 
            href={TELEGRAM} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-3 p-3 -mx-1 rounded-2xl border border-sea-teal/10 hover:border-sea-teal/30 hover:bg-sea-teal/5 transition-all"
          >
            <div className="text-[#229ED9] group-hover:scale-110 transition-transform">
              <Send className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div className="flex-1">
              <p className="font-body text-[0.95rem] font-medium text-charcoal">Telegram</p>
              <span className="text-sm text-sea-teal group-hover:underline">{t('telegramCta')}</span>
            </div>
          </a>

          {/* Address */}
          <a 
            href={YANDEX_MAPS} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-start gap-3 p-3 -mx-1 rounded-2xl hover:bg-cream transition-all"
          >
            <div className="mt-0.5 text-sea-teal group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5" strokeWidth={1.6} />
            </div>
            <div>
              <p className="font-body text-[0.9rem] leading-snug text-charcoal">{t('address')}</p>
            </div>
          </a>
        </div>

        {/* Primary low-friction CTA */}
        <a
          href={WHATSAPP}
          data-analytics="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-3xl bg-[#25D366] px-6 py-3.5 font-body text-sm font-semibold text-white shadow-sm transition-all hover:brightness-105 hover:scale-[1.01] active:scale-[0.985]"
        >
          <MessageCircle className="h-5 w-5" />
          {t('whatsappNow')}
        </a>

        <p className="mt-3 text-center text-[10px] tracking-widest text-warm-gray-light">
          Usually replies within minutes
        </p>
      </div>
    </div>
  );
}