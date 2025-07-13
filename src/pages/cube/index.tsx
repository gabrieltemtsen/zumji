import React, { useState } from 'react';
import Layout from '../Layout';
import Cube from '@/animation/three.js/cube';
import FloatingAds from '@/components/ads/FloatingAds';

const CubePage: React.FC = () => {
  const [score, setScore] = useState(0);

  const handleCubeClick = () => setScore((s) => s + 1);

  return (
    <Layout subNavBarTitle="Zumji >> Cube">
      <div className="relative h-full w-full">
        <div className="absolute top-4 left-4 z-20 text-white text-lg font-bold bg-black/60 px-3 py-1 rounded-md">
          Score: {score}
        </div>
        <Cube onCubeClick={handleCubeClick} />
        <FloatingAds />
      </div>
    </Layout>
  );
};

export default CubePage;
