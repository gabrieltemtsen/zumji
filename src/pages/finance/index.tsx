/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
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
      <Navbar title="Loans" />

      <div className="m-5">
        <BlockTitle> Request Loan </BlockTitle>

        <Block>
          <div className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Company
              </label>
             
            </div>

            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Loan Amount(cUsd)
              </label>
              <input
                onChange={(e) => setLoanAmount(e.target.value)}
                type="text"
                id="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="100"
                required
              />
            </div>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Reason
              </label>
              <input
                onChange={(e) => setReason(e.target.value)}
                type="text"
                id="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="emergency"
                required
              />
            </div>

            {inTxn ? (
              <Preloader className="center-item mt-3" />
            ) : (
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply for Loan
              </button>
            )}
          </div>
        </Block>

     

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default Index;