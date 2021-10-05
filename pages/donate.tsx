/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import Header from "../components/General/Header";
import Link from "../components/General/Link";
import Footer from "../components/General/Footer";

import Image1 from "../components/Donate/img1";
import Image2 from "../components/Donate/img2";
import Image3 from "../components/Donate/img3";
import Image4 from "../components/Donate/img4";

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
            <h1 className="font-bold text-lg mb-1">
              ChronoJudge needs donations!
            </h1>
            <p>
              First and foremost, I would like to thank all of you for using
              ChronoJudge. For the first month or so of it's operation,
              ChronoJudge has been used by nearly everyone in CHRONOS, with
              approximately 16.000 code submit events tracked by Google
              Analytics as of 05/10/2021.
            </p>
            <div className="mx-auto max-w-max mt-4" style={{ width: "28rem" }}>
              <Image4 />
              <p className="text-center">
                <span className="font-semibold">Image 1:</span> Amount of Code
                Submissions (05/10/2021)
              </p>
            </div>
            <br />
            <p>
              For the time being, ChronoJudge is being hosted on private
              expense, hence we are only able to fund at most 3 ChronoJudge
              instances for approximately Rp.150.000,00/month.
            </p>

            <div className="mx-auto max-w-max mt-4">
              <Image1 />
              <p className="text-center">
                <span className="font-semibold">Image 2:</span> Server instances
              </p>
            </div>

            <br />
            <p>
              If you would like to help in funding ChronoJudge, feel free to
              donate any spare money you might have to the saweria account below
              (seikhlasnya aja yak wkwk).
              <br />
              <br />
              Most of the donations will be dedicated to funding the existing 3
              servers and deploying another instance to ensure maximum
              availability during TP and Lab, and I am planning to donate any
              extra acquired to the
              <Link href="https://github.com/Hzzkygcs" target="_blank">
                TC contributor
              </Link>{" "}
              for his help in making this project possible.
            </p>
            <div className="w-64 mt-4 mx-auto flex flex-col items-center">
              <div className="rounded-md p-1 bg-white max-w-max w-full">
                <Image2 />
              </div>
              <Link href="https://saweria.co/meta1518">
                https://saweria.co/meta1518
              </Link>
            </div>
            <p className="text-center font-semibold">
              (will be closed after the target of Rp. 400.000,00 is reached, I
              am not trying to profit from this.)
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
