import { siteUrl } from '@/lib/site';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85';

export function buildLodgingBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Белый Дом / White House Sochi',
    image: [
      `${siteUrl}/og-image-ru.jpg`,
      HERO_IMAGE,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ивановская улица, 2/17',
      addressLocality: 'Сочи',
      addressRegion: 'Краснодарский край',
      postalCode: '354350',
      addressCountry: 'RU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.464403,
      longitude: 39.969182,
    },
    telephone: '+7-962-157-44-97',
    priceRange: '₽₽',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '19',
      bestRating: '5',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free parking',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Swimming pool',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free WiFi',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Air conditioning',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Breakfast included',
        value: true,
      },
    ],
    url: siteUrl,
    sameAs: [
      'https://t.me/SochiWhiteHouse',
      'https://vk.com/sochiwhitehouse',
      'https://www.instagram.com/sochi_white_house',
    ],
  };
}