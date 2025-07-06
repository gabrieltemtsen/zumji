import React from "react";
import Layout from "./Layout";
import Link from "next/link";
import { Button } from "konsta/react";
import LottieAnimation from "@/animation/lottie";

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
        <h1 className="text-5xl font-extrabold text-white">404</h1>
        <p className="text-gray-300">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" className="inline-block">
          <Button className="bg-gray-700">Go Home</Button>
        </Link>
        <LottieAnimation />
      </div>
    </Layout>
  );
}
