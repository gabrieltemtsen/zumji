/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  Sheet,
  Link,
  BlockTitle,
  Preloader,
  Toast,
} from "konsta/react";
import Layout from "../Layout";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { useRouter } from "next/router";

const Index = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [username, setUsername] = useState(" ");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [toastMessage, setToastMessage] = useState<any>("");
  const router = useRouter();

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
        console.error("Error fetching username:", error);
      }
    };

    if (address) fetchUsername();
  }, [address]);

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
      console.error("Error checking onboarding status:", error);
    }
  };

  useEffect(() => {
    if (address) getIsOnboarded();
  }, [address]);

  const handleUsernameChange = (event: any) => {
    setNewUsername(event.target.value);
  };

  const updateUsername = async () => {
    if (!newUsername) {
      setToastMessage("Please enter a valid username.");
      return;
    }

    try {
      setInTxn(true);
      setToastMessage("Updating username, please wait...");
      const { hash } = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: "updateUsername",
        args: [newUsername],
      });
      await waitForTransaction({ hash });
      setUsername(newUsername);
      setIsSheetOpen(false);
      setToastMessage("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      setToastMessage("Failed to update username. Please try again.");
    } finally {
      setInTxn(false);
    }
  };

  if (!isOnboarded) {
    return (
      <Layout>
        <Navbar title="Zumji >> Finance" />
        <Block className="m-5">
          <div className="flex flex-wrap justify-center items-center gap-10">
            <div className="max-w-lg w-10/12 p-6 bg-gray-800 border-gray-700 rounded-lg shadow text-center">
              <h5 className="mb-4 text-lg md:text-3xl font-bold text-white">
                Oops! You are not onboarded.
              </h5>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-blue-700 hover:bg-blue-800"
              >
                Click here to onboard
              </Button>
            </div>
          </div>
        </Block>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar title="Zumji >> Profile" />
      <div className="m-5">
        <Block>
          <div className="max-w-sm mx-auto">
            <div className="w-full rounded-lg shadow bg-gray-800 border-gray-700">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsSheetOpen(true)}
                  className="text-gray-500 hover:bg-gray-100 focus:ring-4 rounded-lg p-1.5"
                >
                  <svg
                    className="w-5 h-5"
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
                  alt="Profile"
                />
                <h5 className="text-xl font-medium text-white">{username}</h5>
                <span className="text-sm text-gray-400">Entrepreneur</span>
                <div className="flex mt-4 gap-2">
                  <Button
                    onClick={() => setIsSheetOpen(true)}
                    className="bg-blue-700 hover:bg-blue-800"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    className="bg-gray-800 text-gray-400 hover:bg-gray-700"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Block>
      </div>

      <Sheet
        opened={isSheetOpen}
        onBackdropClick={() => setIsSheetOpen(false)}
        className={`pb-safe ${isSheetOpen ? "relative max-w-md" : "mb-5"}`}
      >
        <Block>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">
              Enter New Username
            </label>
            <input
              onChange={handleUsernameChange}
              type="text"
              placeholder="Lena.eth"
              className="w-full p-2.5 bg-gray-50 border rounded-lg text-sm"
              required
            />
          </div>
          {inTxn ? (
            <Preloader />
          ) : (
            <Button onClick={updateUsername} disabled={inTxn}>
              Update Username
            </Button>
          )}
        </Block>
      </Sheet>

      {toastMessage && (
        <Toast
          
          
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2"
        />
      )}
    </Layout>
  );
};

export default Index;
