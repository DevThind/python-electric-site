'use client';

import { useEffect, useState } from 'react';

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const syncVideo = () => setShowVideo(desktop.matches && !reducedMotion.matches && !saveData);

    syncVideo();
    desktop.addEventListener('change', syncVideo);
    reducedMotion.addEventListener('change', syncVideo);
    return () => {
      desktop.removeEventListener('change', syncVideo);
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
