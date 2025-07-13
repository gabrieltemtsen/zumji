import React from 'react';

interface Ad {
  src: string;
  alt: string;
  delay: number;
}

const ads: Ad[] = [
  { src: '/tap.jpeg', alt: 'Ad 1', delay: 0 },
  { src: '/celo.png', alt: 'Ad 2', delay: 2 },
  { src: '/images/logo/zumji_logo.jpeg', alt: 'Ad 3', delay: 4 },
];

const FloatingAds: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {ads.map((ad, idx) => (
        <img
          key={idx}
          src={ad.src}
          alt={ad.alt}
          style={{ animationDelay: `${ad.delay}s` }}
          className="absolute w-20 h-20 opacity-80 animate-ad-float"
        />
      ))}
    </div>
  );
};

export default FloatingAds;
