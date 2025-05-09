/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Navbar, Block, Button, Sheet, Preloader, Link } from 'konsta/react';
import { useAccount } from 'wagmi';
import { readContract, writeContract, waitForTransaction } from '@wagmi/core';
import { ZUMJI_ABI, ZUMJI_CONTRACT } from '@/utils/contracts';
import { useRouter } from 'next/router';

import Layout from '../Layout';

const Index: React.FC = () => {
  const { address } = useAccount();
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
        }),
      ]);

      setState((s) => ({ ...s, username: name, isOnboarded: onboarded }));
    } catch (err) {
      console.error('fetchProfile', err);
    }
  }, [address]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ─────────────────────  Event handlers  ───────────────────── */

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((s) => ({ ...s, newUsername: e.target.value }));

  const updateUsername = async () => {
    if (!state.newUsername.trim()) return;

    setState((s) => ({ ...s, inTxn: true }));
    try {
      const { hash } = await writeContract({
        address: ZUMJI_CONTRACT,
        abi: ZUMJI_ABI,
        functionName: 'updateUsername',
        args: [state.newUsername.trim()],
      });
      await waitForTransaction({ hash });
      setState((s) => ({
        ...s,
        username: s.newUsername.trim(),
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

  if (!state.isOnboarded) {
    return (
      <Layout>
        <Navbar title="Zumji › Finance" />
        <Block className="flex h-full items-center justify-center">
          <div className="w-10/12 max-w-lg rounded-lg bg-gray-800 p-6 shadow">
            <Link onClick={() => router.push('/')}>
              <h5 className="text-center text-xl font-bold text-white">
                Oops! You’re not onboarded yet. Click here to get started.
              </h5>
            </Link>
          </div>
        </Block>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar title="Zumji › Profile" />
      <Block className="m-5 flex justify-center">
        <div className="w-full max-w-sm rounded-lg bg-gray-800 pb-10 shadow">
          <div className="flex justify-end p-4">
            <Button
              rounded
              small
              onClick={() => setState((s) => ({ ...s, isSheetOpen: true }))}
            >
              ⋮
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="https://i.postimg.cc/nh2FHC2T/gabe-AVATAR.jpg"
              alt="profile"
              className="mb-3 h-24 w-24 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-white">
              {state.username || 'Unnamed'}
            </h5>
            <span className="text-sm text-gray-400">Entrepreneur</span>

            <div className="mt-6 flex gap-2">
              <Button
                onClick={() => setState((s) => ({ ...s, isSheetOpen: true }))}
              >
                Edit profile
              </Button>
              <Button outline>Logout</Button>
            </div>
          </div>
        </div>
      </Block>

      {/* ────────────────  Edit username sheet  ──────────────── */}
      <Sheet
        opened={state.isSheetOpen}
        onBackdropClick={() => setState((s) => ({ ...s, isSheetOpen: false }))}
        className="pb-safe max-w-md"
      >
        <Block className="space-y-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            New username
          </label>
          <input
            value={state.newUsername}
            onChange={handleUsernameInput}
            type="text"
            placeholder="lena.eth"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          />
          {state.inTxn ? (
            <Preloader className="mx-auto mt-3" />
          ) : (
            <Button onClick={updateUsername} disabled={state.inTxn}>
              Update Username
            </Button>
          )}
        </Block>
      </Sheet>
    </Layout>
  );
};

export default Index;
