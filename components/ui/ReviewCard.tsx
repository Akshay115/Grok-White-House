'use client';

import { motion } from 'framer-motion';
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
    <motion.blockquote 
      className="review-card relative shrink-0 bg-white border border-warm-gray/10 rounded-3xl p-8 shadow-[0_10px_40px_-15px_rgb(0,0,0,0.06)]"
      whileHover={{ 
        y: -6, 
        boxShadow: '0 20px 50px -12px rgb(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      {/* Animated elegant quote mark */}
      <motion.span
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="pointer-events-none absolute left-6 top-4 font-display text-[5.5rem] font-light italic leading-none text-sea-teal"
        aria-hidden="true"
      >
        &ldquo;
      </motion.span>

      <p className="relative z-10 mt-4 font-display text-[1.05rem] font-normal italic leading-[1.7] text-charcoal">
        {text}
      </p>

      {/* Subtle rating stars per review */}
      <div className="mt-4 flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-sea-teal text-lg leading-none">★</span>
        ))}
      </div>

      <footer className="relative z-10 mt-6 flex items-center justify-between gap-sm">
        <div className="flex items-center gap-sm">
          <ReviewAvatar name={author} />
          <div>
            <cite className="not-italic">
              <span className="block font-body text-[0.9rem] font-semibold text-charcoal tracking-tight">
                {author}
              </span>
            </cite>
            <time
              className="font-body text-[0.75rem] text-warm-gray-light"
              dateTime={date}
            >
              {date}
            </time>
          </div>
        </div>
        <YandexBadge label={platform} />
      </footer>
    </motion.blockquote>
  );
}