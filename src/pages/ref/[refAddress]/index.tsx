import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ReferralPage() {
  const router = useRouter();
  const { refAddress } = router.query;

  useEffect(() => {
    if (refAddress && typeof refAddress === "string") {
      localStorage.setItem("zumji_referrer", refAddress);
      router.replace("/");
    }
  }, [refAddress, router]);

  return null;
}
