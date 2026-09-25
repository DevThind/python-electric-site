'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { WorkPhoto } from '@/lib/content';

export function Gallery({ photos }: { photos: WorkPhoto[] }) {
  const [selected, setSelected] = useState<WorkPhoto | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  function open(photo: WorkPhoto, button: HTMLButtonElement) { trigger.current = button; setSelected(photo); requestAnimationFrame(() => dialog.current?.showModal()); }
  function close() { dialog.current?.close(); setSelected(null); trigger.current?.focus(); }
  return <><div className="gallery-grid">{photos.map((photo, i) => <button key={photo.id} className={`gallery-card gallery-card-${i % 6}`} type="button" onClick={event => open(photo, event.currentTarget)} aria-label={`View larger image: ${photo.caption}`}><span className="gallery-image"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" /></span><span className="gallery-caption"><span>{photo.caption}<small>{photo.group}</small></span><span aria-hidden="true">↗</span></span></button>)}<div className="gallery-end-card"><span className="eyebrow">Beyond the images</span><p>There’s more to electrical work than what the camera sees.</p><Link href="/services">Explore all services <span aria-hidden="true">↗</span></Link></div></div><dialog ref={dialog} className="lightbox" onClose={() => { setSelected(null); trigger.current?.focus(); }} onClick={event => { if (event.target === dialog.current) close(); }}>{selected && <div className="lightbox-content"><button className="lightbox-close" type="button" onClick={close} aria-label="Close image">×</button><Image src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} sizes="90vw" /><p>{selected.caption}</p></div>}</dialog></>;
}
