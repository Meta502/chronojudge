import React from "react";
import Head from "next/head";
import Header from "../components/General/Header";
import Link from "../components/General/Link";
import Footer from "../components/General/Footer";

const donators = [
  {
    name: "vincent s",
    amount: 50000,
  },
  {
    name: "Dixon",
    amount: 25000,
  },
  {
    name: "bakastev",
    amount: 10000,
  },
  {
    name: "Gaji asdos yang tak dibayar2",
    amount: 50000,
  },
  {
    name: "hy landy",
    amount: 25000,
  },
  {
    name: "Tito",
    amount: 50000,
  },
  {
    name: "algo ku N(O!)",
    amount: 20659,
  },
  {
    name: "Kevin",
    amount: 10000,
  },
  {
    name: "Ndar",
    amount: 25000,
  },
  {
    name: "Rasengaaaan",
    amount: 50000,
  },
  {
    name: "larrypult",
    amount: 100000,
  },
  {
    name: "Mymy",
    amount: 20000,
  },
];

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

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
            <h1 className="font-bold">Credits:</h1>
            <p>
              Test Cases:
              <Link target="_blank" href="https://github.com/Hzzkygcs">
                @Hzzkygcs
              </Link>
            </p>
            <p>
              Developer:
              <Link target="_blank" href="https://github.com/Meta502">
                @Meta502
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
        <div
          className="max-w-5xl mx-auto w-full p-6 rounded-xl space-y-4"
          style={{ backgroundColor: "#222222" }}
        >
          <div>
            <h1 className="font-bold">Server Hosting Donators:</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {donators
                .sort((a, b) => b.amount - a.amount)
                .map((item) => {
                  return (
                    <div
                      key={item.name}
                      style={{ backgroundColor: "#303030" }}
                      className="p-4 rounded-lg"
                    >
                      <h1 className="font-semibold text-lg ">{item.name}</h1>
                      <p>
                        <span className="font-semibold">Amount:</span>{" "}
                        {formatter.format(item.amount)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Credits;
