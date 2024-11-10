/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  BlockTitle,
  Preloader,
  Chip,
  Icon,
} from "konsta/react";
import Layout from "./Layout";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { writeContract, readContract, waitForTransaction } from "@wagmi/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import AnimateFromLeft from "@/animation/animate-from-left";
import AnimateFromRight from "@/animation/animate-from-right";
import AnimateFromBottom from "@/animation/animate-from-bottom";
import { homeBackground } from "@/constants/images";

export default function Home() {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleOnboard = async () => {
    try {
      setInTxn(true);
      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "onboard",
        args: [],
      });
      const hash = await waitForTransaction(tx);
      toast.success("Onboarding successful!");
      getIsOnboarded();
      setInTxn(false);
    } catch (error) {
      toast.error("Onboarding failed!");
      console.error("ONBOARDING ERR", error);
      setInTxn(false);
    }
  };

  const getIsOnboarded = async () => {
    try {
      const isOnboarded: any = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "isUserOnboarded",
        args: [address],
      });
      setIsOnboarded(isOnboarded);
    } catch (error) {
      console.error("ISONB: ", error);
    }
  };

  useEffect(() => {
    if (address) {
      getIsOnboarded();
    }
  }, [address]);

  return (
    <Layout>
      <div
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${homeBackground})` }}
      >
        <section className="bg-gradient-to-b from-yellow-700/[4.79] via-yellow-800 h-full">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center md:py-16 md:px-8">
            <a
              href="https://celo.org"
              target="_blank"
              className="inline-flex items-center justify-between px-3 py-2 pr-4 text-sm rounded-full mb-7 bg-gray-800 text-white hover:bg-gray-700"
              role="alert"
            >
              <Chip
                media={
                  <img
                    alt="celo"
                    className="h-6 w-6 rounded-full"
                    src="/celo.png"
                  />
                }
                className="text-xs bg-black rounded-full text-white px-4 py-1.5 mr-3"
              />
              <span className="text-sm font-medium ml-2">Powered by Celo</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <AnimateFromRight>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl text-white">
                Transform Your Business with Zumji: Loyalty, Rewards, and More
              </h1>
            </AnimateFromRight>
            <AnimateFromLeft>
              <p className="mb-8 text-base font-normal text-white md:text-lg lg:text-xl sm:px-6 md:px-12">
                Empowering SMEs with Staking, Borrowing, and Innovative Rewards
                on Celo
              </p>
            </AnimateFromLeft>
            <AnimateFromBottom>
              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                {isOnboarded ? (
                  <Link
                    className="mt-4 max-w-full w-auto px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-full shadow hover:shadow-lg focus:ring-2 focus:ring-yellow-600"
                    href="/finance"
                  >
                    Zumji Stats
                    <svg
                      className="w-4 h-4 inline-block ml-1"
                      fill="none"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.279 2L10.926 7.646c.195.195.195.512 0 .707L5.279 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                ) : (
                  <button
                    className="mt-4 max-w-full w-auto px-6 py-3 bg-yellow-700 text-white text-sm font-medium rounded-full shadow hover:bg-yellow-800 focus:ring-2 focus:ring-yellow-600"
                    onClick={handleOnboard}
                    disabled={inTxn}
                  >
                    {inTxn ? (
                      <Preloader className="mt-1" />
                    ) : (
                      <>
                        Join Zumji
                        <Icon
                          ios={<FaChevronRight className="w-4 h-4 ml-1" />}
                          material={<FaChevronRight className="w-4 h-4 ml-1" />}
                        />
                      </>
                    )}
                  </button>
                )}
              </div>
            </AnimateFromBottom>
          </div>
        </section>
      </div>
      <ToastContainer />
    </Layout>
  );
}
