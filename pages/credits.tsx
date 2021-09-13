import React from "react";
import Head from "next/head";
import Header from "../components/General/Header";
import Link from "../components/General/Link";
import Footer from "../components/General/Footer";

const Credits: React.FC = () => {
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
          className="max-w-5xl mx-auto w-full p-6 rounded-xl space-y-4"
          style={{ backgroundColor: "#222222" }}
        >
          <div>
            <h1 className="font-bold">Test Case Contributors:</h1>
            <p>Coming Soon!</p>
          </div>
          <div>
            <h1 className="font-bold">Credits:</h1>
            <p>
              Developer:
              <Link target="_blank" href="https://github.com/Meta502">
                @Meta502
              </Link>
            </p>
            <p>
              Initial test cases for Public Test:
              <Link target="_blank" href="https://github.com/Hzzkygcs">
                @Hzzkygcs
              </Link>
            </p>
            <p>
              Original idea and output processing code was based off AlghiJudge
              created by
              <Link target="_blank" href="https://github.com/darklordace">
                @darklordace
              </Link>{" "}
              (Kak Firdaus Al-Ghifari).
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Credits;
