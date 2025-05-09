/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { readContract, writeContract, waitForTransaction } from '@wagmi/core';
import { Navbar, Block, Button, Preloader, Link } from 'konsta/react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Layout from '../Layout';
import P2ESwiper from './components/swiper/P2ESwiper';
import { ZUMJI_ABI, ZUMJI_CONTRACT } from '@/utils/contracts';

import 'react-toastify/dist/ReactToastify.css';

const DAILY_LIMIT = 100;

const Index: React.FC = () => {
  const { address } = useAccount();
  const router = useRouter();

  const [state, setState] = useState({
    clicks: 0,
    dailyClicks: 0,
    points: 0,
    hasClaimed: false,
    isOnboarded: false,
    inTxn: false,
  });

  /* ──────────────────────  Contract reads  ────────────────────── */

  const fetchHasClaimed = useCallback(async () => {
    if (!address) return;
    try {
      const claimed: boolean = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: 'hasClaimedToday',
        args: [address],
      });
      setState((s) => ({ ...s, hasClaimed: claimed }));
    } catch (err) {
      console.error('fetchHasClaimed', err);
    }
  }, [address]);

  const fetchIsOnboarded = useCallback(async () => {
    if (!address) return;
    try {
      const onboarded: boolean = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: 'isUserOnboarded',
        args: [address],
      });
      setState((s) => ({ ...s, isOnboarded: onboarded }));
    } catch (err) {
      console.error('fetchIsOnboarded', err);
    }
  }, [address]);

  useEffect(() => {
    fetchHasClaimed();
    fetchIsOnboarded();
  }, [fetchHasClaimed, fetchIsOnboarded]);

  /* ───────────────────  Midnight reset timer  ─────────────────── */

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);

    const timer = setTimeout(
      () =>
        setState((s) => ({
          ...s,
          dailyClicks: 0,
          hasClaimed: false,
        })),
      nextMidnight.getTime() - now.getTime(),
    );

    return () => clearTimeout(timer);
  }, [state.dailyClicks]);

  /* ────────────────────────  Handlers  ───────────────────────── */

  const handleClick = () => {
    if (state.dailyClicks >= DAILY_LIMIT || state.hasClaimed) return;

    setState((s) => ({
      ...s,
      clicks: s.clicks + 1,
      dailyClicks: s.dailyClicks + 1,
      points: s.points + 1,
    }));
  };

  const handleClaim = async () => {
    setState((s) => ({ ...s, inTxn: true }));
    try {
      const { hash } = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: 'claimDailyPoints',
      });
      await waitForTransaction({ hash });
      setState((s) => ({ ...s, clicks: 0, hasClaimed: true }));
      toast.success('Claim successful!');
    } catch (err) {
      console.error(err);
      toast.error('Claim failed!');
    } finally {
      setState((s) => ({ ...s, inTxn: false }));
    }
  };

  /* ───────────────────────  Derived UI  ──────────────────────── */

  const canClaim = useMemo(
    () => state.dailyClicks >= DAILY_LIMIT && !state.hasClaimed && !state.inTxn,
    [state],
  );

  /* ─────────────────────────  Render  ────────────────────────── */

  if (!state.isOnboarded) {
    return (
      <Layout>
        <Navbar title="Zumji › Finance" />
        <Block className="flex h-full items-center justify-center">
          <div className="w-10/12 max-w-lg rounded-lg bg-gray-800 p-6 shadow">
            <Link onClick={() => router.push('/')}>
              <h5 className="text-center text-xl font-bold text-white sm:text-2xl">
                Oops! You’re not onboarded yet. Click here to get started.
              </h5>
            </Link>
          </div>
        </Block>
        <ToastContainer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar title="Zumji › Play2Earn" />
      <div className="m-5 space-y-6">
        <Block className="flex flex-col items-center">
          <button
            className="flex flex-col items-center"
            onClick={handleClick}
            disabled={state.dailyClicks >= DAILY_LIMIT || state.hasClaimed}
          >
            <h1 className="mb-2 text-lg font-bold text-black">Tap to Earn</h1>
            <img
              src="/tap.jpeg"
              alt="Tap to earn"
              className="mb-2 h-36 w-40 rounded-2xl object-cover"
            />
            <span className="text-2xl font-bold text-black">
              ZUMJI POINTS: {state.points}
            </span>
          </button>
        </Block>

        {state.inTxn ? (
          <Preloader className="mx-auto" />
        ) : (
          <Button
            className="bg-gray-900"
            outline
            onClick={handleClaim}
            disabled={!canClaim}
          >
            <span className="text-white">Claim Points</span>
          </Button>
        )}

        {state.hasClaimed && (
          <span className="block text-center text-red-800">
            You’ve already claimed today. Come back tomorrow!
          </span>
        )}

        <P2ESwiper />
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default Index;
