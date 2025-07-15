import React from 'react';
import { FaHandHoldingUsd, FaBriefcase, FaBullhorn, FaGift } from 'react-icons/fa';

const features = [
  {
    icon: FaHandHoldingUsd,
    title: 'Stake to Earn',
    description: 'Stake cUSD and receive Zumji points.',
    color: '#FFA500',
    accent: '#FFD700',
  },
  {
    icon: FaBriefcase,
    title: 'Borrow Funds',
    description: 'Access liquidity with your staked assets.',
    color: '#0099CC',
    accent: '#00D4FF',
  },
  {
    icon: FaBullhorn,
    title: 'Advertise',
    description: 'Promote products to a targeted audience.',
    color: '#FF4444',
    accent: '#FF6B6B',
  },
  {
    icon: FaGift,
    title: 'Redeem Rewards',
    description: 'Convert Zumji points back to cUSD.',
    color: '#26A69A',
    accent: '#4ECDC4',
  },
];

const Features = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {features.map((feature, index) => {
      const IconComponent = feature.icon;
      return (
        <div key={feature.title} className="group relative">
          {/* Main card with neon glow effect */}
          <div
            className="relative h-48 bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-gray-700 transition-all duration-500 overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
            }}
          >
            {/* Animated background gradient */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${feature.accent}40, transparent 70%)`
              }}
            />

            {/* Neon border effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(45deg, ${feature.accent}60, transparent, ${feature.accent}60)`,
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                padding: '1px',
              }}
            >
              <div
                className="h-full w-full bg-gray-900/90"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col">
              {/* Icon with glow */}
              <div className="mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.accent}20, ${feature.color}20)`,
                    boxShadow: `0 0 20px ${feature.accent}30`
                  }}
                >
                  <IconComponent
                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: feature.accent }}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
                style={{ color: feature.accent }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Accent line */}
              <div className="mt-auto pt-4">
                <div
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: feature.accent
                  }}
                />
              </div>
            </div>

            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: feature.accent
              }}
            />
          </div>
        </div>
      );
    })}
  </div>
);

export default Features;
