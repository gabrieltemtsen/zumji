/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Page,
  Navbar,
  Block,
  Button,
  Preloader,
} from "konsta/react";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { Swiper, SwiperSlide } from "swiper/react";
import Layout from "../Layout";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [dailyClicks, setDailyClicks] = useState(0);
  const [zumjiPoints, setZumjiPoints] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);

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

  return (
    <Layout>
      <Navbar title="Zumji >> Play2Earn" />
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

        <hr className="h-px my-2 bg-gray-700"></hr>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight p-5 text-white">
                    Advertise Products Here
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ms-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white">$599</span>
                  <a
                    href="#"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Go To
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          </SwiperSlide>
        </Swiper>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Index;
