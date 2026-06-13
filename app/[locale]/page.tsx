import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import About from '@/components/sections/About';
import Amenities from '@/components/sections/Amenities';
import Booking from '@/components/sections/Booking';
import Discover from '@/components/sections/Discover';
import Hero from '@/components/sections/Hero';
import Reviews from '@/components/sections/Reviews';
import Rooms from '@/components/sections/Rooms';
import Footer from '@/components/ui/Footer';
import Navigation from '@/components/ui/Navigation';
import SectionSkeleton from '@/components/ui/SectionSkeleton';
import HadidFlow from '@/components/ui/HadidFlow';

const Gallery = dynamic(() => import('@/components/sections/Gallery'), {
  loading: () => <SectionSkeleton minHeight="min-h-[600px]" className="bg-white" />,
});

const Location = dynamic(() => import('@/components/sections/Location'), {
  loading: () => <SectionSkeleton minHeight="min-h-[700px]" className="bg-cream" />,
});

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <div className="relative h-[92px] -mt-px overflow-hidden bg-pearl">
          <HadidFlow variant="section-divider" color="gold" opacity={0.6} fillColor="var(--pearl)" />
        </div>
        <About />
        <div className="relative h-[72px] overflow-hidden bg-off-white -mt-px">
          <HadidFlow variant="section-divider" color="gold" opacity={0.45} fillColor="var(--off-white)" />
        </div>
        <Rooms />
        <div className="relative h-[88px] -mt-1 overflow-hidden bg-pearl">
          <HadidFlow variant="section-divider" color="gold" opacity={0.5} fillColor="var(--pearl)" />
        </div>
        <Amenities />
        <Gallery />
        <div className="relative h-[68px] overflow-hidden bg-white -mt-px">
          <HadidFlow variant="section-divider" color="gold" opacity={0.55} fillColor="var(--white)" />
        </div>
        <Reviews />
        <Location />
        <Discover />
        <Booking />
      </main>
      <Footer />
    </>
  );
}