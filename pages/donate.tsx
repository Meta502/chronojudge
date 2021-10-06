/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import Header from "../components/General/Header";
import Link from "../components/General/Link";
import Footer from "../components/General/Footer";

import Image1 from "../components/Donate/img1";

const Donate: React.FC = () => {
  return (
    <>
      <Head>
        <title>ChronoJudge</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <div
        className="flex flex-col justify-start min-h-screen w-full h-full py-16 px-6 md:px-0 space-y-4"
        style={{ backgroundColor: "#181818" }}
      >
        <Header />
        <div
          className="max-w-5xl mx-auto w-full p-6 rounded-xl space-y-4 text-justify"
          style={{ backgroundColor: "#222222" }}
        >
          <div>
            <h1 className="text-lg font-bold">
              ChronoJudge is now fully funded.
            </h1>
            <p>
              Thank you to everyone who has donated their money. Overall we have
              managed to gather about Rp. 413.625,00 from donations. The money
              will be used to fund another instance of the ChronoJudge API
              (ChronoJudge-4) when TP2 is released and cover the expenses of the
              existing 3 instances until the end of this semester.
            </p>
            <div className="mx-auto max-w-max mt-4">
              <Image1 />
              <p className="text-center">
                <span className="font-semibold">Image 1:</span> Donation
                Earnings
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
