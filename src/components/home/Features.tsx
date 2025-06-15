import React from 'react';
import { FaHandHoldingUsd, FaBullhorn, FaGift, FaCoins } from 'react-icons/fa';
import { GiBriefcase } from 'react-icons/gi';

const features = [
  {
    icon: <FaHandHoldingUsd className="w-8 h-8 mb-2 text-yellow-500" />,
    title: 'Stake to Earn',
    description: 'Stake cUSD and receive Zumji points.',
  },
  {
    icon: <GiBriefcase className="w-8 h-8 mb-2 text-yellow-500" />,
    title: 'Borrow Funds',
    description: 'Access liquidity with your staked assets.',
  },
  {
    icon: <FaBullhorn className="w-8 h-8 mb-2 text-yellow-500" />,
    title: 'Advertise',
    description: 'Promote products to a targeted audience.',
  },
  {
    icon: <FaGift className="w-8 h-8 mb-2 text-yellow-500" />,
    title: 'Redeem Rewards',
    description: 'Convert Zumji points back to cUSD.',
  },
];

const Features = () => (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {features.map((feature) => (
      <div key={feature.title} className="text-center text-white px-4">
        {feature.icon}
        <h3 className="font-semibold mb-1">{feature.title}</h3>
        <p className="text-sm text-gray-300">{feature.description}</p>
      </div>
    ))}
  </div>
);

export default Features;
