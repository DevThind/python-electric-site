'use client';

import { useEffect, useState } from 'react';

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const syncVideo = () => setShowVideo(!reducedMotion.matches && !saveData);

    syncVideo();
    reducedMotion.addEventListener('change', syncVideo);
    return () => {
      reducedMotion.removeEventListener('change', syncVideo);
    };
  }, []);

  if (!showVideo) return null;

  return (
    <video
      className="reference-hero-video"
      width={1280}
      height={720}
      poster="/images/python-electric-hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src="/videos/python-electric-hero.mp4" type="video/mp4" />
    </video>
  );
}
