type SectionSkeletonProps = {
  minHeight?: string;
  className?: string;
};

export default function SectionSkeleton({
  minHeight = 'min-h-[480px]',
  className = '',
}: SectionSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-off-white/60 ${minHeight} ${className}`}
      aria-hidden="true"
    />
  );
}