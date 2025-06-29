import React, { useEffect, useState } from 'react';
import { Block, Preloader } from 'konsta/react';
import Layout from '../Layout';
import { ethers } from 'ethers';
import { ZUMJI_ABI, ZUMJI_CONTRACT } from '@/utils/contracts';

interface EventRecord {
  name: string;
  trader: string;
  amount?: string;
  extra?: string;
  blockNumber: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('https://forno.celo.org');
    const contract = new ethers.Contract(ZUMJI_CONTRACT, ZUMJI_ABI, provider);

    const fetchData = async () => {
      setLoading(true);
      try {
        const onboarded = await contract.queryFilter(contract.filters.Onboarded());
        const uniqueUsers = Array.from(new Set(onboarded.map(ev => ev.args?.trader.toLowerCase())));
        setUsers(uniqueUsers);

        const eventFilters = [
          contract.filters.Staked(),
          contract.filters.Unstaked(),
          contract.filters.Borrowed(),
          contract.filters.Repaid(),
          contract.filters.AdPosted(),
          contract.filters.ZumjiRedeemed(),
        ];
        const allEvents: EventRecord[] = [];
        for (const filter of eventFilters) {
          const logs = await contract.queryFilter(filter);
          logs.forEach(log => {
            const { args, event, blockNumber } = log as any;
            allEvents.push({
              name: event || 'Event',
              trader: args?.trader,
              amount: args?.amount ? ethers.utils.formatEther(args.amount) : undefined,
              extra: args?.cid || (args?.early !== undefined ? (args.early ? 'early' : 'no') : undefined),
              blockNumber,
            });
          });
        }
        allEvents.sort((a, b) => b.blockNumber - a.blockNumber);
        setEvents(allEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout subNavBarTitle="Zumji >> Admin Dashboard">
      <div className="m-5 h-full">
        <Block>
          <h1 className="text-white text-xl mb-4 font-bold">Registered Users ({users.length})</h1>
          <ul className="space-y-1 mb-6 max-h-48 overflow-y-auto text-sm">
            {users.map(user => (
              <li key={user} className="break-all text-gray-300">{user}</li>
            ))}
          </ul>
          <h1 className="text-white text-xl mb-4 font-bold">Events</h1>
          {loading ? (
            <Preloader className="mx-auto" />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                  <tr>
                    <th className="px-4 py-2">Event</th>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Amount/Info</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => (
                    <tr key={i} className="bg-gray-800 border-b border-gray-700">
                      <td className="px-4 py-2">{e.name}</td>
                      <td className="px-4 py-2 break-all">{e.trader}</td>
                      <td className="px-4 py-2">{e.amount || e.extra || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Block>
      </div>
    </Layout>
  );
};

export default Dashboard;
