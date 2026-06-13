declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
  }
}

export const YANDEX_METRIKA_ID = Number(
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? '0'
);

export type AnalyticsEvent =
  | 'page_view'
  | 'cta_book'
  | 'cta_whatsapp'
  | 'cta_phone'
  | 'form_submit'
  | 'form_success'
  | 'form_error';

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string>) {
  if (typeof window === 'undefined' || !YANDEX_METRIKA_ID) return;

  const goalMap: Partial<Record<AnalyticsEvent, string>> = {
    cta_book: 'cta_book',
    cta_whatsapp: 'cta_whatsapp',
    cta_phone: 'cta_phone',
    form_submit: 'form_submit',
    form_success: 'form_success',
    form_error: 'form_error',
  };

  const goal = goalMap[event];
  if (goal && window.ym) {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', goal, params);
  }

  if (event === 'page_view' && window.ym) {
    window.ym(YANDEX_METRIKA_ID, 'hit', window.location.href, {
      title: document.title,
      referer: document.referrer,
      ...params,
    });
  }
}

export function trackCtaFromElement(element: HTMLElement) {
  const track = element.dataset.analytics;
  if (track === 'book') trackEvent('cta_book');
  if (track === 'whatsapp') trackEvent('cta_whatsapp');
  if (track === 'phone') trackEvent('cta_phone');
}