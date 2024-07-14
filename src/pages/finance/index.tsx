/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GiBriefcase } from "react-icons/gi";
import { FaHandHoldingUsd } from "react-icons/fa";
import {
  Page,
  Navbar,
  Block,
  Button,
  Card,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Preloader,
  Table,
  List,
  ListItem,
  Link,
  Sheet,
  BlockTitle,
  Chip,
  Toolbar,
} from "konsta/react";
import { ethers } from "ethers";
import Layout from "../Layout";
import { FaWallet } from "react-icons/fa";
import { FaMoneyCheckDollar, FaPeopleGroup } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { IoMdArrowDropright } from "react-icons/io";
import { FaCoins } from "react-icons/fa6";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { USDT_ABI, USDT_CONTRACT_ADDRESS, ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [inTxn, setInTxn] = useState(false);
  const [stakedAmount, setStakedAmount] = useState<any>(0);
  const [zumjiBalance, setZumjiBalance] = useState<any>(0);
  const [borrowedAmount, setBorrowedAmount] = useState<any>(0);
  const [stakeSheetOpened, setStakeSheetOpened] = useState(false);
  const [unstakeSheetOpened, setUnstakeSheetOpened] = useState(false);
  const [redeemSheetOpened, setRedeemSheetOpened] = useState(false);
  const [borrowSheetOpened, setBorrowSheetOpened] = useState(false);
  const [repaySheetOpened, setRepaySheetOpened] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const EARLY_UNSTAKING_FEE = 1;

  useEffect(() => {
    getBalances();
  }, []);
  
  const getBalances = async () => {
    try {
      const stakedAmount: any = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "getStakedAmount",
        args: [address],
      });
      setStakedAmount(ethers.utils.formatEther(stakedAmount));

      const zumjiBalance: any = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "getZumjiPoints",
        args: [address],
      });
      setZumjiBalance(ethers.utils.formatEther(zumjiBalance));

      const amountBorrowed: any = await readContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "borrowedAmount",
        args: [address],
      });
      setBorrowedAmount(ethers.utils.formatEther(amountBorrowed));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount) return alert("Please enter a valid amount");
    
    try {
      setInTxn(true);

      const ToApprove = ethers.utils.parseEther(stakeAmount);

      const { hash } = await writeContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: USDT_ABI,
        functionName: "approve",
        args: [ZUMJI_CONTRACT, ToApprove],
      });
      await waitForTransaction({ hash });

      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "stake",
        args: [ToApprove],
      });
      await waitForTransaction(tx);
      toast.success("Staking successful!");
      getBalances();
      setStakeSheetOpened(false);
    } catch (error) {
      toast.error("Staking failed!");
      console.log(error);
    } finally {
      setInTxn(false);
    }
  };

  const handleUnStake = async () => {
    if (!unstakeAmount) return alert("Please enter a valid amount to unstake");
    
    try {
      setInTxn(true);

      const ToApprove = ethers.utils.parseEther(unstakeAmount);
      const amountWithFeeForApproval = Number(unstakeAmount) + EARLY_UNSTAKING_FEE;
      const aprroveWithFee = ethers.utils.parseEther(amountWithFeeForApproval.toString());

      const { hash } = await writeContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: USDT_ABI,
        functionName: "approve",
        args: [ZUMJI_CONTRACT, aprroveWithFee],
      });
      await waitForTransaction({ hash });

      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "unstake",
        args: [ToApprove],
      });
      await waitForTransaction(tx);
      toast.success("Unstaking successful!");
      getBalances();
      setUnstakeSheetOpened(false);
    } catch (error) {
      toast.error("Unstaking failed!");
      console.log(error);
    } finally {
      setInTxn(false);
    }
  };

  const handleRedeem = async () => {
    try {
      setInTxn(true);
      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "redeemZumji",
        args: [],
      });
      await waitForTransaction(tx);
      toast.success("Redeem successful!");
      getBalances();
      setRedeemSheetOpened(false);
    } catch (error) {
      toast.error("Redeem failed!");
      console.log(error);
    } finally {
      setInTxn(false);
    }
  };

  const handleBorrow = async () => {
    if (!borrowAmount) return alert("Please enter a valid amount to borrow");
    const amountInWei = ethers.utils.parseEther(borrowAmount.toString());
    const _amount = amountInWei.toString();

    try {
      setInTxn(true);
      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "borrow",
        args: [_amount],
      });
      await waitForTransaction(tx);
      toast.success("Borrow successful!");
      getBalances();
      setBorrowSheetOpened(false);
    } catch (error) {
      toast.error("Borrow failed!");
      console.log(error);
    } finally {
      setInTxn(false);
    }
  };

  const handleRepay = async () => {
    if (!repayAmount) return alert("Please enter a valid amount to repay");
    const amountInWei = ethers.utils.parseEther(repayAmount.toString());
    const _amount = amountInWei.toString();

    try {
      setInTxn(true);
      const tx = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "repay",
        args: [_amount],
      });
      await waitForTransaction(tx);
      toast.success("Repay successful!");
      getBalances();
      setRepaySheetOpened(false);
    } catch (error) {
      toast.error("Repay failed!");
      console.log(error);
    } finally {
      setInTxn(false);
    }
  };

  return (
    <Layout>
      <Navbar title={`Zumji >> Finance`} />
      <div className="m-5 h-full">
        <Block>
          <div className="flex flex-wrap max-w-auto mx-auto gap-10 justify-center items-center">
            <div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
              <a href="#">
                <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">Your Stake</h5>
              </a>
              <h1 className="flex flex-wrap sm:text-lg md:text-3xl gap-1">
                <span className="font-bold text-white">{Number(stakedAmount)}</span>
                <span className="font-medium text-gray-400">cUSD</span>
              </h1>
              <div className="flex gap-2">
                <a href="#" onClick={() => setStakeSheetOpened(true)} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <GiBriefcase />
                  Stake
                </a>
                <a href="#" onClick={() => setUnstakeSheetOpened(true)} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
                  <FaHandHoldingUsd />
                  Unstake
                </a>
              </div>
            </div>

            <div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
              <a href="#">
                <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">Total Points Earned</h5>
              </a>
              <h1 className="flex flex-wrap sm:text-lg md:text-3xl gap-1">
                <span className="font-bold text-white">{Number(zumjiBalance)}</span>
                <span className="font-medium text-gray-400">zumji</span>
              </h1>
              <div className="flex gap-2">
                <a href="#" onClick={() => setRedeemSheetOpened(true)} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                  <FaCoins />
                  Redeem
                </a>
                <Link onClick={(e) => { router.push('/p2e') }} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
                  <FaHandHoldingUsd />
                  Earn
                </Link>
              </div>
            </div>

            <div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
              <a href="#">
                <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">Your Loans</h5>
              </a>
              <h1 className="flex flex-wrap sm:text-lg md:text-3xl gap-1">
                <span className="font-bold text-white">{Number(borrowedAmount)}</span>
                <span className="font-medium text-gray-400">cUSD</span>
              </h1>
              <div className="flex gap-2">
                <a href="#" onClick={() => setRepaySheetOpened(true)} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                  <FaCoins />
                  Repay
                </a>
                <a href="#" onClick={() => setBorrowSheetOpened(true)} className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
                  <FaHandHoldingUsd />
                  Borrow
                </a>
              </div>
            </div>
          </div>
        </Block>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      <Sheet className={`pb-safe  ${stakeSheetOpened ? 'relative max-w-md': 'mb-5'}`} opened={stakeSheetOpened} onBackdropClick={() => setStakeSheetOpened(false)}>
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setStakeSheetOpened(false)}>
              Close
            </Link>
          </div>
        </Toolbar>
        <Block className="flex flex-col justify-center items-center h-full p-4">
          <div className="mb-5 w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stake Amount (cUSD)</label>
            <input onChange={(e) => setStakeAmount(e.target.value)} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="100" required />
          </div>
          {inTxn ? (
            <Preloader className="center-item mt-3" />
          ) : (
            <button onClick={handleStake} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Stake
            </button>
          )}
        </Block>
      </Sheet>
      <Sheet className={`pb-safe  ${unstakeSheetOpened ? 'relative max-w-md': 'mb-5'}`} opened={unstakeSheetOpened} onBackdropClick={() => setUnstakeSheetOpened(false)}>
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setUnstakeSheetOpened(false)}>
              Close
            </Link>
          </div>
        </Toolbar>
        <Block className="flex flex-col justify-center items-center h-full p-4">
          <div className="mb-5 w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unstake Amount (cUSD)</label>
            <input onChange={(e) => setUnstakeAmount(e.target.value)} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="100" required />
          </div>
          {inTxn ? (
            <Preloader className="center-item mt-3" />
          ) : (
            <button onClick={handleUnStake} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Unstake
            </button>
          )}
        </Block>
      </Sheet>
      <Sheet className={`pb-safe  ${borrowSheetOpened ? 'relative max-w-md': 'mb-5'}`} opened={borrowSheetOpened} onBackdropClick={() => setBorrowSheetOpened(false)}>
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setBorrowSheetOpened(false)}>
              Close
            </Link>
          </div>
        </Toolbar>
        <Block className="flex flex-col justify-center items-center h-full p-4">
          <div className="mb-5 w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Borrow Amount (cUSD)</label>
            <p>You can only borrow 50% of your stake, other reqs coming soon!</p>
            <input onChange={(e) => setBorrowAmount(e.target.value)} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 mt-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="100" required />
          </div>
          {inTxn ? (
            <Preloader className="center-item mt-3" />
          ) : (
            <button onClick={handleBorrow} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Borrow
            </button>
          )}
        </Block>
      </Sheet>
      <Sheet className={`pb-safe  ${repaySheetOpened ? 'relative max-w-md': 'mb-5'}`} opened={repaySheetOpened} onBackdropClick={() => setRepaySheetOpened(false)}>
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setRepaySheetOpened(false)}>
              Close
            </Link>
          </div>
        </Toolbar>
        <Block className="flex flex-col justify-center items-center h-full p-4">
          <div className="mb-5 w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repay Amount (cUSD)</label>
            <input onChange={(e) => setRepayAmount(e.target.value)} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 mt-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="100" required />
          </div>
          {inTxn ? (
            <Preloader className="center-item mt-3" />
          ) : (
            <button onClick={handleRepay} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Repay
            </button>
          )}
        </Block>
      </Sheet>
      <Sheet className={`pb-safe  ${redeemSheetOpened ? 'relative max-w-md': 'mb-5'}`} opened={redeemSheetOpened} onBackdropClick={() => setRedeemSheetOpened(false)}>
        <Toolbar top>
          <div className="left" />
          <div className="right">
            <Link toolbar onClick={() => setRedeemSheetOpened(false)}>
              Close
            </Link>
          </div>
        </Toolbar>
        <Block>
          <div className="mb-5">
            <p>
              You have <strong>{zumjiBalance}</strong> Zumji Points available for redemption.
            </p>
          </div>
          {inTxn ? (
            <Preloader className="center-item mt-3" />
          ) : (
            <button onClick={handleRedeem} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Redeem
            </button>
          )}
        </Block>
      </Sheet>
      <ToastContainer />
    </Layout>
  );
};

export default Index;
