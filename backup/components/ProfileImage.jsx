import Image from 'next/image';
import React from 'react';

export default function ProfileImage() {
  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <Image
        src="/avatar.jpg"
        alt="User Avatar"
        fill
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        priority
        placeholder="blur"
        blurDataURL="/avatar-blur.jpg"
      />
    </div>
  );
}