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
        stroke="white"
        strokeWidth="1.5"
        opacity="0.06"
      />
      <path
        d="M0,300 C120,220 220,380 340,280 S420,200 450,320"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.06"
      />
      <path
        d="M40,450 C160,350 260,500 360,400 S440,320 480,480"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.05"
      />
      <path
        d="M200,0 C240,120 180,240 220,360 S260,480 200,600"
        fill="none"
        stroke="white"
        strokeWidth="0.75"
        opacity="0.04"
      />
    </svg>
  );
}

export default function BookingContact() {
  const t = useTranslations('booking.contact');
  const phoneHref = `tel:${t('phone').replace(/\s/g, '')}`;

  return (
    <div className="booking-contact-clip relative h-full bg-deep-navy p-lg md:p-[3rem]">
      <ContactDecor />

      <div className="relative z-10">
        <h3 className="font-display text-[2rem] font-light italic text-white">
          {t('heading')}
        </h3>

        <div className="mt-lg space-y-sm">
          <a href={phoneHref} data-analytics="phone" className="booking-contact-item block">
            <Phone className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <p className="mt-xs font-body text-body font-medium text-white">
              {t('phone')}
            </p>
            <p
              className="mt-0.5 font-body text-[0.8rem]"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {t('phoneLabel')}
            </p>
          </a>

          <div className="booking-contact-item">
            <MessageCircle className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <p className="mt-xs font-body text-body font-medium text-white">
              {t('phone')}
            </p>
            <a
              href={WHATSAPP}
              data-analytics="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-xs inline-block font-body text-[0.85rem] text-gold transition-opacity hover:opacity-80"
            >
              {t('whatsappCta')}
            </a>
          </div>

          <div className="booking-contact-item">
            <Send className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <p className="mt-xs font-body text-body font-medium text-white">
              {t('telegram')}
            </p>
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-xs inline-block font-body text-[0.85rem] text-gold transition-opacity hover:opacity-80"
            >
              {t('telegramCta')}
            </a>
          </div>

          <a
            href={VK}
            target="_blank"
            rel="noopener noreferrer"
            className="booking-contact-item block"
          >
            <span className="font-body text-[0.85rem] font-semibold text-gold">
              VK
            </span>
            <p className="mt-xs font-body text-body text-white">{t('vk')}</p>
          </a>

          <a
            href={YANDEX_MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="booking-contact-item block"
          >
            <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
            <p className="mt-xs font-body text-[0.9rem] leading-relaxed text-white/80">
              {t('address')}
            </p>
          </a>
        </div>

        <a
          href={WHATSAPP}
          data-analytics="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-lg flex w-full items-center justify-center gap-sm rounded-[2px] bg-[#25D366] px-md py-sm font-body text-[0.9rem] font-semibold text-white transition-all hover:brightness-110 hover:scale-[1.02]"
        >
          <MessageCircle className="h-5 w-5" />
          {t('whatsappNow')}
        </a>
      </div>
    </div>
  );
}