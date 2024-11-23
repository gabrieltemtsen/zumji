/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GiBriefcase } from "react-icons/gi";
import { FaHandHoldingUsd } from "react-icons/fa";
import {
  Navbar,
  Block,
  Link,
} from "konsta/react";
import { ethers } from "ethers";
import Layout from "../Layout";
import { useAccount } from "wagmi";
import { FaCoins } from "react-icons/fa6";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { USDT_ABI, USDT_CONTRACT_ADDRESS, ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinanceCards from "./cards";
import FinanceModal from "./sheets(modals)";

const Index = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [inTxn, setInTxn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

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

    getIsOnboarded();

  }, [address]);

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
      console.log(zumjiBalance);
      setZumjiBalance(Number(ethers.utils.formatEther(zumjiBalance)) / 1000000000000000);

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
  if (!isOnboarded) {
    return (
      <Layout>
        <Navbar title={`Zumji >> Finance`} />
        <div className="m-5 h-full ">
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
    <Layout>
      <Navbar title={`Zumji >> Finance`} />
      <div className="m-5 h-full">
        <Block>
          <div className="flex flex-wrap max-w-auto mx-auto gap-10 justify-center items-center">
            <FinanceCards
              title="Your Stake"
              amount={Number(stakedAmount)}
              currency="cUSD"
              leftButtonTitle="Stake"
              rightButtonTitle="Unstake"
              onLeftButtonClick={() => setStakeSheetOpened(true)}
              onRightButtonClick={() => setUnstakeSheetOpened(true)}
              leftButtonIcon={<GiBriefcase />}
              rightButtonIcon={<FaHandHoldingUsd />}
            />
            <FinanceCards
              title="Total Points Earned"
              amount={Number(zumjiBalance)}
              currency="zumji"
              leftButtonTitle="Redeem"
              rightButtonTitle="Earn"
              onLeftButtonClick={() => setRedeemSheetOpened(true)}
              onRightButtonClick={() => { router.push('/p2e'); }}
              leftButtonIcon={<FaCoins />}
              rightButtonIcon={<FaHandHoldingUsd />}
            />
            <FinanceCards
              title="Total Points Earned"
              amount={Number(borrowedAmount)}
              currency="cUSD"
              leftButtonTitle=" Repay"
              rightButtonTitle="Borrow"
              onLeftButtonClick={() => setRepaySheetOpened(true)}
              onRightButtonClick={() => setBorrowSheetOpened(true)}
              leftButtonIcon={<FaCoins />}
              rightButtonIcon={<FaHandHoldingUsd />}
            />
          </div>
        </Block>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      <FinanceModal
        isSheetOpen={stakeSheetOpened}
        onBackdropClick={() => setStakeSheetOpened(false)}
        onButtonClick={handleUnStake}
        onClose={() => setStakeSheetOpened(false)}
        onInputChange={setStakeAmount}
        opened={stakeSheetOpened}
        inTxn={inTxn}
        inputLabel="Stake Amount (cUSD)"
        buttonText='Stake'
      />
      <FinanceModal
        isSheetOpen={unstakeSheetOpened}
        opened={unstakeSheetOpened}
        onBackdropClick={() => setUnstakeSheetOpened(false)}
        onClose={() => setUnstakeSheetOpened(false)}
        onButtonClick={handleUnStake}
        onInputChange={setUnstakeAmount}
        inTxn={inTxn}
        inputLabel="Unstake Amount (cUSD)"
        buttonText='Unstake'
      />
      <FinanceModal
        isSheetOpen={borrowSheetOpened}
        opened={borrowSheetOpened}
        onBackdropClick={() => setBorrowSheetOpened(false)}
        onClose={() => setBorrowSheetOpened(false)}
        onButtonClick={handleBorrow}
        onInputChange={setBorrowAmount}
        inTxn={inTxn}
        inputLabel="Borrow Amount (cUSD)"
        buttonText='Borrow'
        inputDescription="You can only borrow 50% of your stake, other reqs coming soon!"
      />
      <FinanceModal
        isSheetOpen={repaySheetOpened}
        opened={repaySheetOpened}
        onBackdropClick={() => setRepaySheetOpened(false)}
        onClose={() => setRepaySheetOpened(false)}
        onButtonClick={handleRepay}
        onInputChange={setRepayAmount}
        inTxn={inTxn}
        inputLabel="Repay Amount (cUSD)"
        buttonText=' Repay'
      />
      <FinanceModal
        isSheetOpen={redeemSheetOpened}
        opened={redeemSheetOpened}
        onBackdropClick={() => setRedeemSheetOpened(false)}
        onClose={() => setRedeemSheetOpened(false)}
        onButtonClick={handleRedeem}
        inTxn={inTxn}
        inputLabel="Repay Amount (cUSD)"
        buttonText=' Repay'
        inputDescription={<p className="text-xs mb-3 text-neutral-300"> You have <strong>{zumjiBalance}</strong> Zumji Points available for redemption. </p> as React.ReactNode}
      />
      <ToastContainer />
    </Layout>
  );
};

export default Index;
