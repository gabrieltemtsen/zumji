import React, { useEffect, useState } from 'react';
import { Block, Preloader } from 'konsta/react';
import Layout from '../Layout';
import { ethers } from 'ethers';
import { ZUMJI_ABI, ZUMJI_CONTRACT } from '@/utils/contracts';
import { FaUsers, FaBullhorn, FaHandHoldingUsd } from 'react-icons/fa';
import { GiBriefcase } from 'react-icons/gi';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="p-6 text-center rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
    <div className="flex items-center justify-center text-yellow-500 text-3xl mb-2">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-1">{value}</h3>
    <p className="text-sm text-gray-300">{title}</p>
  </div>
);

const StatsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [traders, setTraders] = useState(0);
  const [totalStaked, setTotalStaked] = useState('0');
  const [totalBorrowed, setTotalBorrowed] = useState('0');
  const [adverts, setAdverts] = useState(0);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('https://forno.celo.org');
    const contract = new ethers.Contract(ZUMJI_CONTRACT, ZUMJI_ABI, provider);

    const fetchStats = async () => {
      setLoading(true);
      try {
        const [staked, borrowed, advertCount] = await Promise.all([
          contract.totalStaked(),
          contract.totalBorrowed(),
          contract.getAdvertCount(),
        ]);

        const onboarded = await contract.queryFilter(contract.filters.Onboarded());
        const uniqueUsers = Array.from(new Set(onboarded.map((ev: any) => ev.args?.trader.toLowerCase())));

        setTraders(uniqueUsers.length);
        setTotalStaked(ethers.utils.formatEther(staked));
        setTotalBorrowed(ethers.utils.formatEther(borrowed));
        setAdverts(advertCount.toNumber());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout subNavBarTitle="Zumji >> Stats">
      <div className="m-5 h-full">
        <Block>
          {loading ? (
            <Preloader className="mx-auto" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <StatCard title="Traders" value={traders} icon={<FaUsers />} />
              <StatCard title="Total Staked" value={Number(totalStaked).toFixed(2)} icon={<GiBriefcase />} />
              <StatCard title="Total Borrowed" value={Number(totalBorrowed).toFixed(2)} icon={<FaHandHoldingUsd />} />
              <StatCard title="Adverts" value={adverts} icon={<FaBullhorn />} />
            </div>
          )}
        </Block>
      </div>
    </Layout>
  );
};

export default StatsPage;
