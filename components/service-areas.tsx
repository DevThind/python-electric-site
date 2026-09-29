import { site } from '@/lib/content';

export function ServiceAreas() {
  return <section className="service-areas section" aria-labelledby="service-areas-title">
    <div className="shell">
      <div className="section-heading">
        <div><span className="eyebrow">Where we work</span><h2 id="service-areas-title">Serving communities across BC.</h2></div>
        <p>Electrical services for homes and businesses across these areas. Tell us where your project is located when you get in touch.</p>
      </div>
      <ul className="service-area-list">{site.serviceAreas.map(area => <li key={area}>{area}</li>)}</ul>
    </div>
  </section>;
}
