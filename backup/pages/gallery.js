// File: pages/gallery.js

import React from 'react';
import Image from 'next/image';

const photos = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg',
];

export default function Gallery() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Photo Gallery</h1>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {photos.map((src, idx) => (
          <div key={idx} style={{ position: 'relative', width: '100%', paddingBottom: '75%' }}>
            <Image
              src={src}
              alt={`Gallery image ${idx + 1}`}
              layout="fill"                                                     // Fill the parent container :contentReference[oaicite:9]{index=9}
              objectFit="cover"                                                 // Maintains aspect ratio  :contentReference[oaicite:10]{index=10}
              quality={80}                                                      // Override default quality per image :contentReference[oaicite:11]{index=11}
              placeholder="blur"                                                 // Low-quality placeholder while loading :contentReference[oaicite:12]{index=12}
              blurDataURL="/images/blur-placeholder.png"                        // Custom blur image :contentReference[oaicite:13]{index=13}
              priority={idx === 0}                                              // Preload the first image for LCP :contentReference[oaicite:14]{index=14}
              sizes="(max-width: 600px) 100vw, 200px"                            // Informs Browser of layout size :contentReference[oaicite:15]{index=15}
            />
          </div>
        ))}
      </div>
    </main>
  );
}