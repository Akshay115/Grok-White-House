'use client';

type YandexBadgeProps = {
  label: string;
};

export default function YandexBadge({ label }: YandexBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[2px] border border-gold/30 px-1.5 py-0.5">
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="7" fill="#C8A96E" opacity="0.9" />
        <path
          d="M5 5.5 L8 10.5 L11 5.5"
          fill="none"
          stroke="#0B1628"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-body text-[0.65rem] font-medium text-gold">
        {label}
      </span>
    </span>
  );
}