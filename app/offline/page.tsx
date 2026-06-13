export const metadata = {
  title: 'Offline — White House Sochi',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-off-white px-sm text-center">
      <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.4em] text-gold">
        Offline
      </p>
      <h1 className="mt-sm font-display text-h2 italic text-deep-navy">
        Белый Дом / White House
      </h1>
      <p className="mt-md max-w-md font-body text-body text-charcoal/70">
        Нет подключения к интернету. Проверьте сеть и попробуйте снова.
        <br />
        <span className="text-charcoal/50">
          No internet connection. Please check your network and try again.
        </span>
      </p>
      <a
        href="/"
        className="mt-lg inline-flex rounded-[2px] border border-gold px-lg py-sm font-body text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-white"
      >
        На главную / Home
      </a>
    </div>
  );
}