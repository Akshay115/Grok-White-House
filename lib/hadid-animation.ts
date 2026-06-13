import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { interpolate } from 'flubber';

gsap.registerPlugin(ScrollTrigger);

type MorphInterpolator = (t: number) => string;

const interpolatorCache = new WeakMap<
  SVGPathElement,
  Map<string, MorphInterpolator>
>();

function getInterpolator(
  el: SVGPathElement,
  from: string,
  to: string
): MorphInterpolator {
  const key = `${from}|${to}`;
  let elCache = interpolatorCache.get(el);

  if (!elCache) {
    elCache = new Map();
    interpolatorCache.set(el, elCache);
  }

  let fn = elCache.get(key);
  if (!fn) {
    fn = interpolate(from, to, { maxSegmentLength: 8 });
    elCache.set(key, fn);
  }

  return fn;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Morph driver — uses GSAP MorphSVG when registered, otherwise flubber interpolation.
 */
export function morphPathTo(
  el: SVGPathElement,
  targetD: string,
  vars: gsap.TweenVars
): gsap.core.Tween {
  const startD = el.getAttribute('d') ?? targetD;
  const morphSVG = (gsap as unknown as { plugins?: { morphSVG?: unknown } }).plugins
    ?.morphSVG;

  if (morphSVG) {
    return gsap.to(el, { morphSVG: targetD, ...vars });
  }

  const interp = getInterpolator(el, startD, targetD);
  const state = { progress: 0 };

  return gsap.to(state, {
    ...vars,
    progress: 1,
    onUpdate: () => {
      el.setAttribute('d', interp(state.progress));
    },
    onComplete: () => {
      el.setAttribute('d', targetD);
    },
  });
}

export function createMorphLoop(
  el: SVGPathElement,
  sequence: string[],
  duration = 10
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1 });

  if (sequence.length < 2) return tl;

  for (let i = 1; i <= sequence.length; i++) {
    const targetD = sequence[i % sequence.length];
    tl.add(morphPathTo(el, targetD, { duration, ease: 'none' }));
  }

  return tl;
}

export type HadidAnimationConfig = {
  container: HTMLElement;
  paths: SVGPathElement[];
  pathSequences: string[][];
  animate: boolean;
  scrollRotate?: boolean;
  drift?: boolean;
};

export function setupHadidAnimations({
  container,
  paths,
  pathSequences,
  animate,
  scrollRotate = false,
  drift = true,
}: HadidAnimationConfig): () => void {
  if (!animate || prefersReducedMotion()) {
    return () => undefined;
  }

  const timelines: gsap.core.Timeline[] = [];
  let scrollTween: gsap.core.Tween | null = null;
  let driftTween: gsap.core.Tween | null = null;
  let observer: IntersectionObserver | null = null;

  const ctx = gsap.context(() => {
    paths.forEach((pathEl, index) => {
      const sequence = pathSequences[index];
      if (!sequence?.length) return;

      const tl = createMorphLoop(pathEl, sequence, 10);
      timelines.push(tl);
    });

    if (drift) {
      driftTween = gsap.to(container, {
        x: -20,
        y: 10,
        duration: 15,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    if (scrollRotate) {
      scrollTween = gsap.to(container, {
        rotate: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }
  }, container);

  const pauseAll = () => {
    timelines.forEach((tl) => tl.pause());
    driftTween?.pause();
  };

  const playAll = () => {
    timelines.forEach((tl) => tl.play());
    driftTween?.play();
  };

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        playAll();
      } else {
        pauseAll();
      }
    },
    { threshold: 0.05 }
  );
  observer.observe(container);

  return () => {
    observer?.disconnect();
    ctx.revert();
    scrollTween = null;
    driftTween = null;
  };
}