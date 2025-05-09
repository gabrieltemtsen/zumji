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
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import P2ESwiper from "./components/swiper/P2ESwiper";
import LottieAnimation from "@/animation/lottie";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";

const DAILY_LIMIT = 100;

const Index: React.FC = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [dailyClicks, setDailyClicks] = useState(0);
  const [zumjiPoints, setZumjiPoints] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  const router = useRouter();
  const { isPageLoading, isOnboarded } = useGetIsOnboarded();

  useEffect(() => {
    const fetchClaimStatus = async () => {
      try {
        const claimed: any = await readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "hasClaimedToday",
          args: [address],
        });
        setHasClaimed(claimed);
      } catch (error) {
        console.error(error);
      }
    };

    if (address) {
      fetchClaimStatus();
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

    const timer = setTimeout(() => {  

      setDailyClicks(0);
      setHasClaimed(false);
    }, timeUntilMidnight);

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

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center">
        <LottieAnimation />
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <Layout subNavBarTitle="Zumji >> Play2Earn">
        <div className="m-5 h-full">
          <Block>
            <div className="flex flex-wrap max-w-auto mx-auto gap-10 justify-center items-center">
              <div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
                <Link onClick={() => { router.push('/'); }}>
                  <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">Oops You are not onboarded, click here to do so</h5>
                </Link>

              </div>
            </div>
          </Block>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        <ToastContainer />
      </Layout>
    );
  }

  return (
    <Layout subNavBarTitle="Zumji >> Play2Earn">
      <div className="m-5">
        <div className="max-w-sm mx-auto justify-center items-center">
          <Block>
            <button
              className="flex flex-row items-center justify-center"
              onClick={handleClick}
              disabled={dailyClicks >= 100 || hasClaimed}
            >
              <h1 className="text-black text-lg font-bold">Press to Earn</h1>
              <div className="button">
                <img
                  src="/tap.jpeg"
                  alt="Click to Earn"
                  className="w-40 object-cover rounded-2xl h-36 mb-2"
                />
              </div>
              <h1 className="text-black text-lg font-bold">Tap to Earn</h1>
            </button>
            <span className="text-2xl text-black font-bold m-5 p-5">
              ZUMJI POINTS: {zumjiPoints}
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
