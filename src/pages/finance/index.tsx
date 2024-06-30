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
} from "konsta/react";
import { ethers } from "ethers";
import Layout from "../Layout";
import { FaWallet } from "react-icons/fa";
import { FaMoneyCheckDollar, FaPeopleGroup } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { IoMdArrowDropright } from "react-icons/io";
import { FaCoins } from "react-icons/fa6";
// import { shortenAddress } from "../../utils/shortenAddress";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
// import {
//   FUSE_PAY_ABI,
//   FUSE_PAY_MANAGER_ABI,
//   FUSE_PAY_MANAGER_ADDRESS,
//   USDT_CONTRACT_ADDRESS,
//   USDT_ABI,
// } from "../../utils/contracts";

const Index = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [loanAmount, setLoanAmount] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [reason, setReason] = useState("");
  const [userCompanies, setUserCompanies] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [adminCompanies, setAdminCompanies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [loanRequests, setLoanRequests] = useState([]);

  // const requestLoan = async () => {
  //   try {
  //     if (!loanAmount || !companyAddress || !reason) {
  //       alert("Please enter all fields");
  //       console.log("Please enter all fields");
  //       return;
  //     }

  //     setInTxn(true);

  //     // Convert loanAmount to Wei
  //     const amountInWei = ethers.utils.parseEther(loanAmount.toString());
  //     const amount = amountInWei.toString();

  //     const { hash } = await writeContract({
  //       address: companyAddress,
  //       abi: FUSE_PAY_ABI,
  //       functionName: "requestLoan",
  //       args: [amount, reason],
  //     });

  //     const receipt = await waitForTransaction({ hash });
  //     if (!receipt) {
  //       console.log("Failed to request loan");
  //       setInTxn(false);
  //       return;
  //     }
  //     console.log("Loan requested successfully");
  //   } catch (error) {
  //     console.log(error);
  //     setInTxn(false);
  //   }
  // };

  // const getAllLoanRequests = async (companyAdd) => {
  //   try {
  //     alert(companyAdd);
  //     const allLoanRequests = await readContract({
  //       address: companyAdd,
  //       abi: FUSE_PAY_ABI,
  //       functionName: "getAllLoanRequests",
  //       args: [],
  //     });
  //     console.log(allLoanRequests);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  
  return (
    <Layout>
      <Navbar title={`Zumji >> Finance`} />

      <div className="m-5">
        
        <Block>


<div className="flex flex-wrap max-w-auto mx-auto gap-10">

<div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
    <a href="#">
        <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">Your Stake  </h5>
    </a>

    <h1 className="flex flex-wrap sm:text-lg md:text-3xl">
        <span className=" font-bold  text-white">10,000</span>
        <span className=" font-medium text-gray-400">cUSD</span>
    </h1>
   <div className="flex gap-2">
   <a href="#" className="inline-flex p-5 mt-3 gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
         {' '}
         <GiBriefcase />
        Stake
    </a>
    <a href="#" className="inline-flex p-5 mt-3  gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none focus:ring-bg-gray-300 bg-gray-600 hover:bg-gray-700 focus:ring-gray-800">
         {' '}
         <FaHandHoldingUsd />
        Unstake
    </a>
   </div>

  
</div>

<div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow ">
    <a href="#">
        <h5 className="mb-2 sm:text-lg md:text-3xl font-bold tracking-tight text-white">Total Points Earned</h5>
    </a>

    <h1 className="flex flex-wrap sm:text-lg md:text-3xl">
        <span className=" font-bold  text-white">100,000</span>
        <span className=" font-medium text-gray-400">zumji</span>
    </h1>
    <a href="#" className="inline-flex p-5 mt-3  gap-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none bg-yellow-600hover:bg-yellow-700 focus:ring-yellow-800">
         {' '}
        <FaCoins />
        Redeem
    </a>
  
</div>


</div>


        </Block>



  

     

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default Index;