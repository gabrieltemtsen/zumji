/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { Navbar, Block, Button, Preloader, Link } from "konsta/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import Layout from "../Layout";
import P2ESwiper from "./components/swiper/P2ESwiper";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import LottieAnimation from "@/animation/lottie";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";

import "react-toastify/dist/ReactToastify.css";

const DAILY_LIMIT = 100;

const Index: React.FC = () => {
  const { address } = useAccount();
  const router = useRouter();

  const [clicks, setClicks] = useState(0);
  const [dailyClicks, setDailyClicks] = useState(0);
  const [zumjiPoints, setZumjiPoints] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [inTxn, setInTxn] = useState(false);

  const { isPageLoading, isOnboarded } = useGetIsOnboarded();

  const fetchHasClaimed = useCallback(async () => {
    if (!address) return;
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
  }, [address]);

  useEffect(() => {
    fetchHasClaimed();
  }, [fetchHasClaimed]);

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setDailyClicks(0);
      setHasClaimed(false);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [dailyClicks]);

  const handleClick = () => {
    if (dailyClicks >= DAILY_LIMIT || hasClaimed) return;

    setClicks((c) => c + 1);
    setDailyClicks((d) => d + 1);
    setZumjiPoints((z) => z + 1);
  };

  const handleClaim = async () => {
    setInTxn(true);
    try {
      const { hash } = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "claimDailyPoints",
      });
      await waitForTransaction({ hash });
      setClicks(0);
      setHasClaimed(true);
      toast.success("Claim successful!");
    } catch (err) {
      console.error(err);
      toast.error("Claim failed!");
    } finally {
      setInTxn(false);
    }
  };

  const canClaim = dailyClicks > 0 && !hasClaimed;

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
                <Link onClick={() => router.push("/")}>
                  <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">
                    Oops! You are not onboarded. Click here to do so.
                  </h5>
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
              className="flex flex-col items-center justify-center w-full"
              onClick={handleClick}
              disabled={dailyClicks >= DAILY_LIMIT || hasClaimed}
            >
              <h1 className="text-black text-lg font-bold mb-2">Tap to Earn</h1>
              <img
                src="/tap.jpeg"
                alt="Click to Earn"
                className="w-40 h-36 object-cover rounded-2xl mb-2"
              />
              <h1 className="text-black text-lg font-bold">
                ZUMJI POINTS: {zumjiPoints}
              </h1>
            </button>
          </Block>

          {inTxn ? (
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

          {hasClaimed && (
            <span className="block text-center text-red-800">
              You’ve already claimed today. Come back tomorrow!
            </span>
          )}
        </div>

        <P2ESwiper />
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default Index;
