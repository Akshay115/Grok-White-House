'use client';

type GsapModule = typeof import('gsap');
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger');

let gsapPromise: Promise<GsapModule['gsap']> | null = null;
let scrollTriggerRegistered = false;

export async function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = import('gsap').then((mod) => mod.gsap);
  }
  return gsapPromise;
}

export async function loadScrollTrigger() {
  const gsap = await loadGsap();
  if (!scrollTriggerRegistered) {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger') as ScrollTriggerModule;
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerRegistered = true;
    return ScrollTrigger;
  }
  const { ScrollTrigger } = await import('gsap/ScrollTrigger') as ScrollTriggerModule;
  return ScrollTrigger;
}