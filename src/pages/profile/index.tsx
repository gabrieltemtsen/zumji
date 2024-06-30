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
      <Navbar title="Zumji >> Profile" />

      <div className="m-5">
       

        <Block>
          <div className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
               Welcome Back
              </label>
             
            </div>


<div className="w-full max-w-sm  rounded-lg shadow bg-gray-800 border-gray-700">
    <div className="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://i.postimg.cc/nh2FHC2T/gabe-AVATAR.jpg" alt="profileImage"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">gabe.celo</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Entrepreneur</span>
        <div className="flex mt-4 md:mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit profile</a>
            <a href="#" className="py-2 px-4 ms-2 text-sm font-medium  focus:outline-none  rounded-lg border   hover:text-blue-700 focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 dark:hover:text-white hover:bg-gray-700">Logout</a>
        </div>
    </div>
</div>



          </div>
        </Block>

     

        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </Layout>
  );
};

export default Index;