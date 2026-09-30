import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/content';

const tileImages: Record<string, string> = {
  'residential-electrical': '/images/07_house_exterior_lighting.png',
  'commercial-electrical': '/images/03_commercial_interior.png',
  'emergency-electrical': '/images/service-panels.webp',
  'electrical-restoration': '/images/service-restoration.webp',
};

export function ServiceTile({ service, headingLevel = 3 }: { service: Service; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return <Link className="service-tile" href={`/services/${service.slug}`}>
    <Image
      className="service-tile-image"
      src={tileImages[service.slug] || service.image || ''}
      alt=""
      fill
      sizes="(max-width: 700px) 100vw, (max-width: 1400px) 45vw, 400px"
    />
    <div className="service-tile-footer">
      <Heading className="service-tile-title">{service.title}</Heading>
      <span className="service-tile-arrow" aria-hidden="true">→</span>
    </div>
  </Link>;
}
