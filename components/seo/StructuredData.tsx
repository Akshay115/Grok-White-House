import { buildLodgingBusinessJsonLd } from '@/lib/structured-data';

export default function StructuredData() {
  const jsonLd = buildLodgingBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}