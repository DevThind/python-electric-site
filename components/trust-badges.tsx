import { useId } from 'react';

export function TrustBadges() {
  const gradientId = useId();

  return (
    <section className="footer-trust" aria-label="Insurance, safety registration, and experience">
      <ul className="trust-badges" role="list">
        <li className="trust-badge">
          <div className="trust-badge-art" aria-hidden="true">
            <svg viewBox="0 0 128 128" focusable="false">
              <g fill="#64a844">
                {Array.from({ length: 8 }, (_, index) => (
                  <path key={index} d="M64 8C89 6 111 28 112 53C100 30 83 21 64 22C53 22 43 26 35 33C41 20 51 12 64 8Z" transform={`rotate(${index * 45} 64 64)`} />
                ))}
              </g>
              <circle cx="64" cy="64" r="43" fill="white" />
              <circle cx="64" cy="64" r="38" fill="none" stroke="#d6e7cf" />
              <path d="m56 39 6 6 11-12" fill="none" stroke="#64a844" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="64" y="70" textAnchor="middle" fill="#176582" fontSize="25" fontWeight="800">$5M</text>
              <text x="64" y="87" textAnchor="middle" fill="#176582" fontSize="11" letterSpacing="1.5">INSURED</text>
            </svg>
          </div>
          <p><strong>$5M liability</strong>{' '}<span>insured</span></p>
        </li>
        <li className="trust-badge">
          <div className="trust-badge-art" aria-hidden="true">
            <svg viewBox="0 0 180 128" focusable="false">
              <rect x="2" y="42" width="176" height="34" rx="2" fill="#151515" />
              <rect x="78" y="44" width="98" height="30" rx="1" fill="#eea425" />
              <text x="40" y="65" textAnchor="middle" fill="white" fontSize="17" fontWeight="900">WORK</text>
              <text x="127" y="65" textAnchor="middle" fill="#151515" fontSize="17" fontWeight="900">SAFE BC</text>
              <g className="trust-badge-registration">
                <path d="m66 94 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="85" y="98" fill="currentColor" fontSize="10" fontWeight="700" letterSpacing="1">REGISTERED</text>
              </g>
            </svg>
          </div>
          <p><strong>WorkSafeBC</strong>{' '}<span>registered</span></p>
        </li>
        <li className="trust-badge">
          <div className="trust-badge-art" aria-hidden="true">
            <svg viewBox="0 0 128 128" focusable="false">
              <defs>
                <linearGradient id={gradientId} x1="0" x2="1">
                  <stop offset="0" stopColor="#717b82" />
                  <stop offset=".22" stopColor="#e3e8eb" />
                  <stop offset=".5" stopColor="#f9fbfc" />
                  <stop offset=".78" stopColor="#c5cdd2" />
                  <stop offset="1" stopColor="#65727b" />
                </linearGradient>
              </defs>
              <path d="M26 14H102V71C102 91 85 106 64 116C43 106 26 91 26 71Z" fill={`url(#${gradientId})`} stroke="#65727b" strokeWidth="2" />
              <path d="M32 20H96V71C96 87 82 101 64 110C46 101 32 87 32 71Z" fill="none" stroke="white" strokeOpacity=".8" />
              <text x="64" y="64" textAnchor="middle" fill="#172c40" fontSize="39" fontWeight="800">5+</text>
              <text x="64" y="80" textAnchor="middle" fill="#172c40" fontSize="10" fontWeight="700" letterSpacing="2">YEARS</text>
              <path d="M46 88H82" stroke="#65727b" />
              <path d="m60 96 3 3 6-7" fill="none" stroke="#172c40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p><strong>5+ years</strong>{' '}<span>of experience</span></p>
        </li>
      </ul>
    </section>
  );
}
