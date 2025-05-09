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
} from "konsta/react";
import Layout from "../Layout";
import { useAccount } from "wagmi";
import { readContract, writeContract, waitForTransaction } from "@wagmi/core";
import { ZUMJI_ABI, ZUMJI_CONTRACT } from "@/utils/contracts";
import { useRouter } from "next/router";
import LottieAnimation from "@/animation/lottie";
import useGetIsOnboarded from "@/hooks/use-get-is-onboarded/useGetIsOnboarded";

const Index: React.FC = () => {
  const { address } = useAccount();
  const [inTxn, setInTxn] = useState(false);
  const [username, setUsername] = useState(" ");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const [usernameError, setUsernameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [retrievedImage, setRetrievedImage] = useState<string | null>(null);
  const router = useRouter();
  const { isPageLoading, isOnboarded } = useGetIsOnboarded();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const name: any = await readContract({
  const router = useRouter();

  const [state, setState] = useState({
    username: '',
    newUsername: '',
    isSheetOpen: false,
    isOnboarded: false,
    inTxn: false,
  });

  /* ────────────────────  Contract helpers  ──────────────────── */

  const fetchProfile = useCallback(async () => {
    if (!address) return;

    try {
      const [name, onboarded]: [string, boolean] = await Promise.all([
        readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: 'getUsername',
          args: [address],
        }),
        readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: 'isUserOnboarded',
          args: [address],
        });
        setUsername(name);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const image: any = await readContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "getProfileImage",
          args: [address],
        });
        setRetrievedImage(image);
      } catch (error) {
        console.error(error);
      }
    };

    if (address) {
      fetchUsername();
      fetchProfileImage();
        }),
      ]);

      setState((s) => ({ ...s, username: name, isOnboarded: onboarded }));
    } catch (err) {
      console.error('fetchProfile', err);
    }
  }, [address]);

  const handleUsernameChange = (event: any) => {
    setNewUsername(event.target.value);
    setUsernameError("");
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ─────────────────────  Event handlers  ───────────────────── */

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((s) => ({ ...s, newUsername: e.target.value }));

  const updateUsername = async () => {
    if (!state.newUsername.trim()) {
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

    setState((s) => ({ ...s, inTxn: true }));
      try {
          const { hash } = await writeContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: 'updateUsername',
          args: [state.newUsername.trim()],
        });
        await waitForTransaction({ hash });

        const { hash: imageHash } = await writeContract({
          address: ZUMJI_CONTRACT,
          abi: ZUMJI_ABI,
          functionName: "updateImage",
          args: [base64Image],
        });
        await waitForTransaction({ hash: imageHash });

        setState((s) => ({
        ...s,
        username: s.newUsername.trim(),
        setRetrievedImage(base64Image);
          isSheetOpen: false,
        newUsername: '',
      }));
      } catch (err) {
        console.error('updateUsername', err);
      } finally {
        setState((s) => ({ ...s, inTxn: false }));
      }
    };

  /* ─────────────────────────  Render  ───────────────────────── */

  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
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

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center">
        <LottieAnimation />
      </div>
    );
  }

  if  (!state.isOnboarded) {
    return (
      <Layout subNavBarTitle="Zumji >> Profile">
        <div className="m-5 h-full">
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
      </Layout>
    );
  }

  return (
    <Layout subNavBarTitle="Zumji >> Profile">
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
                  src={retrievedImage || (imagePreview instanceof Blob ? URL.createObjectURL(imagePreview) : (imagePreview as string || "https://i.postimg.cc/nh2FHC2T/gabe-AVATAR.jpg"))}
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

      {/* ────────────────  Edit username sheet  ──────────────── */}
      <Sheet
        opened={isSheetOpen}
        onBackdropClick={() => setIsSheetOpen(false)}
        className={`pb-safe  ${isSheetOpen ? 'relative max-w-md' : 'mb-5'}`}
      >
        <Block>
          <div className="mb-5 w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter New Username</label>
            <input
              onChange={handleUsernameChange}
              type="text"
              id="text"
              className="shadow-sm bg-gray-50 border border-gray-300 mt-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Lena.eth"
              required
            />
            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
          </div>
          <div className="mb-5 w-full max-w-md">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 p-1.5 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
          </div>
          {
            inTxn ? (<Preloader className="center-item mt-3" />) : (
              <Button onClick={updateUsername} disabled={inTxn}>
                Update Profile
              </Button>
            )
          }
        </Block>
      </Sheet>
    </Layout>
  );
};

export default Index;
