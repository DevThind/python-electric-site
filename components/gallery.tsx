'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { GalleryPhoto } from '@/lib/content';

export function Gallery({ photos, showEndCard = true }: { photos: GalleryPhoto[]; showEndCard?: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  function open(index: number, button: HTMLButtonElement) { trigger.current = button; setSelected(index); requestAnimationFrame(() => dialog.current?.showModal()); }
  function close() { dialog.current?.close(); }
  function move(direction: number) { setSelected(current => current === null ? null : (current + direction + photos.length) % photos.length); }
  useEffect(() => {
    if (selected === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); setSelected(current => current === null ? null : (current + 1) % photos.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSelected(current => current === null ? null : (current - 1 + photos.length) % photos.length); }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [selected, photos.length]);
  const photo = selected === null ? null : photos[selected];
  return <><div className="gallery-grid">{photos.map((item, i) => <button key={item.id} className="gallery-card" type="button" onClick={event => open(i, event.currentTarget)} aria-label={`View larger image: ${item.caption}`}><span className="gallery-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></span><span className="gallery-caption"><span>{item.caption}<small>{item.group}</small></span><span aria-hidden="true">↗</span></span></button>)}
    {showEndCard && <div className="gallery-end-card"><span className="eyebrow">Beyond the images</span><p>Electrical work goes beyond what the camera sees.</p><Link href="/services" className="text-link">Explore all services <span aria-hidden="true">↗</span></Link></div>}
  </div><dialog ref={dialog} className="lightbox" aria-label="Installation photo viewer" onClose={() => { setSelected(null); trigger.current?.focus(); }} onClick={event => { if (event.target === dialog.current) close(); }}>{photo && <div className="lightbox-content"><div className="lightbox-top"><span>{selected! + 1} / {photos.length}</span><button className="lightbox-close" type="button" onClick={close} aria-label="Close image">×</button></div><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="90vw" /><div className="lightbox-bottom"><button type="button" onClick={() => move(-1)} aria-label="Previous image">← Previous</button><p>{photo.caption}</p><button type="button" onClick={() => move(1)} aria-label="Next image">Next →</button></div></div>}</dialog></>;
}
