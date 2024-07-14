/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  Sheet,
  BlockTitle,
  Preloader,
} from "konsta/react";
import Layout from "../Layout";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";

const Index = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [username, setUsername] = useState(" ");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const name: any = await readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "getUsername",
          args: [address],
        });
        setUsername(name);
      } catch (error) {
        console.error(error);
      }
    };

    if (address) {
      fetchUsername();
    }
  }, [address]);

  const handleUsernameChange = (event:any) => {
    setNewUsername(event.target.value);
  };

  const updateUsername = async () => {
    if (!newUsername) return;
    try {
      setInTxn(true);
      const { hash } = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "updateUsername",
        args: [newUsername],
      });
      await waitForTransaction({ hash });
      setUsername(newUsername);
      setIsSheetOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setInTxn(false);
    }
  };

  return (
    <Layout>
      <Navbar title="Zumji >> Profile" />
      <div className="m-5">
        <Block>
          <div className="max-w-sm mx-auto">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {/* Welcome Back, {address} */}
              </label>
            </div>
            <div className="w-full max-w-sm rounded-lg shadow bg-gray-800 border-gray-700">
              <div className="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                  onClick={() => setIsSheetOpen(true)}
                >
                  <span className="sr-only">Open dropdown</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="https://i.postimg.cc/nh2FHC2T/gabe-AVATAR.jpg"
                  alt="profileImage"
                />
                <h5 className="mb-1 text-xl font-medium text-white">
                  {username}
                </h5>
                <span className="text-sm text-gray-400">Entrepreneur</span>
                <div className="flex mt-4 md:mt-6">
                  <button
                    onClick={() => setIsSheetOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit profile
                  </button>
                  <a
                    href="#"
                    className="py-2 px-4 ms-2 text-sm font-medium  focus:outline-none  rounded-lg border   hover:text-blue-700 focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 dark:hover:text-white hover:bg-gray-700"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Block>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>

      <Sheet
        opened={isSheetOpen}
        onBackdropClick={() => setIsSheetOpen(false)}
        className={`pb-safe  ${isSheetOpen ? 'relative max-w-md': 'mb-5'}`}
      >
        <Block>
          <div className="mb-5 w-full max-w-md">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter New Username</label>
      <input onChange={handleUsernameChange} type="text" id="text" className="shadow-sm bg-gray-50 border border-gray-300 mt-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Lena.eth" required />
    </div>
    {
      inTxn ? (<Preloader  className="center-item mt-3"/>) : (
        <Button onClick={updateUsername} disabled={inTxn}>
            Update Username
          </Button>
      )
    }
          
        </Block>
      </Sheet>
    </Layout>
  );
};

export default Index;
