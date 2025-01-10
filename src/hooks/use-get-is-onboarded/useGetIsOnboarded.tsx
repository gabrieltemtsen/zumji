import { ZUMJI_ABI, ZUMJI_CONTRACT } from '@/utils/contracts';
import { useEffect, useState, useCallback } from 'react';
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

const useGetIsOnboarded = () => {
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const { address } = useAccount();

    const getIsOnboarded = useCallback(async () => {
        setIsPageLoading(true);
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
        } finally {
            setIsPageLoading(false);
        }
    }, [address]);

    useEffect(() => {
        getIsOnboarded();
    }, [getIsOnboarded]);

    return {
        isPageLoading,
        isOnboarded,
    };
};

export default useGetIsOnboarded;
