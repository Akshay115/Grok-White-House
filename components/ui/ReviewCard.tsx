'use client';

import ReviewAvatar from '@/components/ui/ReviewAvatar';
import YandexBadge from '@/components/ui/YandexBadge';

type ReviewCardProps = {
  text: string;
  author: string;
  date: string;
  platform: string;
};

export default function ReviewCard({
  text,
  author,
  date,
  platform,
}: ReviewCardProps) {
  return (
    <blockquote className="review-card relative shrink-0">
      <span
        className="pointer-events-none absolute left-md top-2 font-display text-[6rem] font-light italic leading-none text-gold/20"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p
        className="relative z-10 font-display text-[1.1rem] font-normal italic leading-[1.75]"
        style={{ color: 'rgba(255, 255, 255, 0.85)' }}
      >
        {text}
      </p>

      <footer className="relative z-10 mt-lg flex items-center justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <ReviewAvatar name={author} />
          <div>
            <cite className="not-italic">
              <span className="block font-body text-[0.9rem] font-semibold text-white">
                {author}
              </span>
            </cite>
            <time
              className="font-body text-[0.75rem]"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              dateTime={date}
            >
              {date}
            </time>
          </div>
        </div>
        <YandexBadge label={platform} />
      </footer>
    </blockquote>
  );
}