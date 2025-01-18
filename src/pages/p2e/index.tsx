/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Page,
  Navbar,
  Block,
  Button,
  Link,
  Preloader,
} from "konsta/react";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import Layout from "../Layout";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import P2ESwiper from "./components/swiper/P2ESwiper";
import LottieAnimation from "@/animation/lottie";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";


const Index = () => {
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


  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = Number(nextMidnight) - Number(now);

    const timer = setTimeout(() => {  

      setDailyClicks(0);
      setHasClaimed(false);
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [dailyClicks]);

  const handleClick = () => {
    if (dailyClicks < 100 && !hasClaimed) {
      setClicks(clicks + 1);
      setDailyClicks(dailyClicks + 1);
      setZumjiPoints(zumjiPoints + 1);
    }
  };

  const handleClaim = async () => {
    try {
      setInTxn(true);
      const { hash } = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "claimDailyPoints",
        args: [],
      });
      await waitForTransaction({ hash });
      setClicks(0);
      setHasClaimed(true);
      toast.success("Claim successful!");
    } catch (error) {
      console.error(error);
      toast.error("Claim failed!");
    } finally {
      setInTxn(false);
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
          </Block>

          {inTxn ? (<Preloader className="center-item mt-3" />) : (
            <Button
              className="my-5 bg-gray-900"
              onClick={handleClaim}
              outline
              disabled={clicks < 100 || inTxn || hasClaimed}
            >
              <span className="text-white">Claim Points</span>
            </Button>
          )}

          {hasClaimed && (
            <span className="text-red-800">
              You have already claimed your points for today. Please come back tomorrow.
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
