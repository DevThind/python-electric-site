'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const manualPause = useRef(false);
  const [eligible, setEligible] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; addEventListener?: (type: string, fn: () => void) => void; removeEventListener?: (type: string, fn: () => void) => void } }).connection;
    const sync = () => setEligible(!motion.matches && !connection?.saveData);
    sync();
    motion.addEventListener('change', sync);
    connection?.addEventListener?.('change', sync);
    return () => { motion.removeEventListener('change', sync); connection?.removeEventListener?.('change', sync); };
  }, []);
  useEffect(() => {
    if (!eligible || !ref.current) return;
    const video = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden && !manualPause.current) void video.play().catch(() => setPlaying(false));
      else video.pause();
    }, { threshold: 0.1 });
    const visibility = () => { if (document.hidden) video.pause(); else if (!manualPause.current && video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().top < innerHeight) void video.play().catch(() => setPlaying(false)); };
    observer.observe(video);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); video.pause(); };
  }, [eligible]);
  if (!eligible) return null;
  return <>
    <video ref={ref} className="home-hero-video" poster="/images/python-electric-hero-poster.jpg?v=20260928" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} disablePictureInPicture>
      <source src="/videos/python-electric-hero.mp4?v=20260928-5s" type="video/mp4" />
    </video>
    <button className="hero-video-control" type="button" aria-label={playing ? 'Pause background video' : 'Play background video'} onClick={() => { manualPause.current = playing; if (playing) ref.current?.pause(); else void ref.current?.play().catch(() => setPlaying(false)); }}>{playing ? 'Pause video' : 'Play video'} <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span></button>
  </>;
}
