import React from 'react';
import Layout from '../Layout';
import Cube from '@/animation/three.js/cube';

const CubePage: React.FC = () => {
  return (
    <Layout subNavBarTitle="Zumji >> Cube">
      <div className="h-full">
        <Cube />
      </div>
    </Layout>
  );
};

export default CubePage;
