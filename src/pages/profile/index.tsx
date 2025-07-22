/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { Page, Block, Button, Sheet, Link, Preloader } from "konsta/react";
import Layout from "../Layout";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { useRouter } from "next/router";
import LottieAnimation from "@/animation/lottie";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";

const Profile: React.FC = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { isPageLoading, isOnboarded } = useGetIsOnboarded();

  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [inTxn, setInTxn] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [retrievedImage, setRetrievedImage] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!address) return;

    try {
      const [name, image] = await Promise.all([
        readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "getUsername",
          args: [address],
        }),
        readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "getProfileImage",
          args: [address],
        }),
      ]);

      setUsername(name as string);
      setRetrievedImage(image as string);
    } catch (err) {
      console.error("fetchProfile", err);
    }
  }, [address]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
    setUsernameError("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setImagePreview(reader.result);
        setImageError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUsername = async () => {
    if (!newUsername.trim()) {
      setUsernameError("Username is required");
      return;
    }
    if (!profileImage) {
      setImageError("Profile image is required");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(profileImage);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setInTxn(true);
      try {
        const { hash: usernameHash } = await writeContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "updateUsername",
          args: [newUsername.trim()],
        });
        await waitForTransaction({ hash: usernameHash });

        const { hash: imageHash } = await writeContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "updateImage",
          args: [base64Image],
        });
        await waitForTransaction({ hash: imageHash });

        setUsername(newUsername.trim());
        setRetrievedImage(base64Image);
        setIsSheetOpen(false);
        setNewUsername("");
      } catch (err) {
        console.error("updateUsername", err);
      } finally {
        setInTxn(false);
      }
    };
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
      <Layout subNavBarTitle="Zumji >> Profile">
        <div className="m-5 h-full">
          <Block>
            <div className="flex justify-center">
              <div className="max-w-lg w-full p-6 bg-gray-800 border-gray-700 rounded-lg shadow text-center">
                <Link onClick={() => router.push("/")}>
                  <h5 className="text-xl font-bold text-white">
                    Oops! You are not onboarded. Click here to do so.
                  </h5>
                </Link>
              </div>
            </div>
          </Block>
        </div>
      </Layout>
    );
  }

  return (
    <Layout subNavBarTitle="Zumji >> Profile">
      <div className="m-5">
        <Block>
          <div className="max-w-sm mx-auto">
            <div className="w-full max-w-sm rounded-xl p-[2px] bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 shadow-lg">
              <div className="rounded-lg bg-gray-800/90 backdrop-blur-lg">
              <div className="flex justify-end px-4 pt-4">
                <button
                  onClick={() => setIsSheetOpen(true)}
                  className="text-gray-400 hover:bg-gray-700 rounded-lg text-sm p-1.5"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg ring-2 ring-yellow-500/60"
                  src={
                    (retrievedImage as string) ||
                    (imagePreview as string) ||
                    "https://i.postimg.cc/nh2FHC2T/gabe-AVATAR.jpg"
                  }
                  alt="profile"
                />
                <h5 className="mb-1 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  {username}
                </h5>
                <span className="text-sm text-gray-400">Entrepreneur</span>
                <div className="flex mt-4">
                  <button
                    onClick={() => setIsSheetOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-black bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg hover:from-yellow-500 hover:to-yellow-700"
                  >
                    Edit Profile
                  </button>
                  <a
                    href="#"
                    className="ml-2 px-4 py-2 text-sm text-gray-400 border border-gray-600 rounded-lg hover:text-white hover:bg-gray-700"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Block>
      </div>

      {/* ─────── Edit Sheet ─────── */}
      <Sheet
        opened={isSheetOpen}
        onBackdropClick={() => setIsSheetOpen(false)}
        className="pb-safe max-w-md"
      >
        <Block>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-white">
              Enter New Username
            </label>
            <input
              onChange={handleUsernameChange}
              type="text"
              placeholder="Lena.eth"
              className="w-full p-2.5 text-sm rounded-lg border bg-gray-700 text-white border-gray-600"
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-white">
              Upload Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm p-1.5 rounded-lg border bg-gray-700 text-gray-400 border-gray-600"
            />
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}
          </div>

          {inTxn ? (
            <Preloader className="center-item mt-3" />
          ) : (
            <Button onClick={updateUsername} disabled={inTxn}>
              Update Profile
            </Button>
          )}
        </Block>
      </Sheet>
    </Layout>
  );
};

export default Profile;
