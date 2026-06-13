'use client';

const AVATAR_COLORS = [
  '#1B4B7A',
  '#C8A96E',
  '#0B1628',
  '#4A6741',
  '#6B4C6A',
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

type ReviewAvatarProps = {
  name: string;
};

export default function ReviewAvatar({ name }: ReviewAvatarProps) {
  const initials = getInitials(name);
  const bg = getColor(name);

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-body text-[0.8rem] font-semibold text-white"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}