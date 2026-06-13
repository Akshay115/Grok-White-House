import dynamic from 'next/dynamic';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import About from '@/components/sections/About';
import Amenities from '@/components/sections/Amenities';
import Booking from '@/components/sections/Booking';
import Hero from '@/components/sections/Hero';
import Reviews from '@/components/sections/Reviews';
import Rooms from '@/components/sections/Rooms';
import Footer from '@/components/ui/Footer';
import Navigation from '@/components/ui/Navigation';
import SectionSkeleton from '@/components/ui/SectionSkeleton';

const Gallery = dynamic(() => import('@/components/sections/Gallery'), {
  loading: () => <SectionSkeleton minHeight="min-h-[600px]" className="bg-white" />,
});

const Location = dynamic(() => import('@/components/sections/Location'), {
  loading: () => <SectionSkeleton minHeight="min-h-[700px]" className="bg-cream" />,
});

type HomePageProps = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: HomePageProps) {
  setRequestLocale(locale);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <Location />
        <Gallery />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </>
  );
}