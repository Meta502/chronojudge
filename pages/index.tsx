import type { NextPage } from "next";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import { Button, Checkbox } from "@chakra-ui/react";

import Dropdown from "../components/General/Dropdown";
import RunStatus from "../components/General/RunStatus";
import donationToast from "../components/Donate/DonationToast";

import onSubmit from "../components/handlers/onSubmit";
import getAllTestcases from "../components/handlers/getAllTestcases";

import onMultiSubmit from "../components/handlers/onMultiSubmit";
import Footer from "../components/General/Footer";
import Header from "../components/General/Header";

import { MultiSubmitModal, MultiSubmitOutput } from "../components/MultiSubmit";
import { useSocketContext } from "../components/hooks/useSocket";

const baseUrl =
  "https://raw.githubusercontent.com/Hzzkygcs/SDA/master/ChronoJudge";

const Editor = dynamic(import("../components/Editors/Editor"), {
  ssr: false,
});

const JavaEditor = dynamic(import("../components/Editors/JavaEditor"), {
  ssr: false,
});

export function pad(num: number, size: number) {
  let numString = num.toString();
  while (numString.length < size) numString = "0" + numString;
  return numString;
}

const Home: NextPage = () => {
  const [code, setCode] = React.useState("");
  const [result, setResult] = React.useState<any>({});
  const [multiResult, setMultiResult] = React.useState<any>([]);
  const [problemSets, setProblemSets] = React.useState<any>([]);
  const [testCases, setTestCases] = React.useState<any[]>([]);
  const [multiSubmit, setMultiSubmit] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const [currentTestCase, setCurrentTestCase] = React.useState<any>();
  const [currentProblemSet, setCurrentProblemSet] = React.useState<any>("");
  const [currentTimeLimit, setCurrentTimeLimit] = React.useState<any>(0);
  const [currentResultIndex, setCurrentResultIndex] = React.useState(-1);

  const socket = useSocketContext();

  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [allTestCases, setAllTestCases] = React.useState({
    input: [],
    output: [],
  });

  const handleMultiSubmit = (result: any) => {
    setMultiResult(result);
  };

  // TODO: Migrate to SWR to simplify hooks.

  React.useEffect(() => {
    const code = localStorage.getItem("lastCode");
    const bannerShown = localStorage.getItem("bannerShown");
    fetch(`${baseUrl}/index.txt`)
      .then((res) => res.text())
      .then((text) => setProblemSets(text.split("\n")));
    if (code) setCode(code);
    if (!bannerShown) {
      donationToast();
      localStorage.setItem("bannerShown", "true");
    }
  }, []);

  React.useEffect(() => {
    if (currentProblemSet) {
      setTestCases([]);
      setSubmitting(true);
      fetch(`${baseUrl}/${currentProblemSet}/num.json`, { cache: "no-cache" })
        .then((res) => res.json())
        .then((item: { numberOfCases: number; timeLimit: number }) => {
          // @ts-ignore
          setTestCases(
            [...new Array(Number(item.numberOfCases))].map(
              (item: any, index: number) => index + 1
            )
          );
          setCurrentTimeLimit(item.timeLimit);
          setCurrentTestCase("");
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }, [currentProblemSet]);

  React.useEffect(() => {
    if (currentProblemSet && currentTestCase) {
      setSubmitting(true);
      Promise.all([
        fetch(
          `${baseUrl}/${currentProblemSet}/in_${pad(currentTestCase, 2)}.txt`,
          {
            cache: "no-cache",
          }
        )
          .then((res) => res.text())
          .then((text) => setInput(text)),
        fetch(
          `${baseUrl}/${currentProblemSet}/out_${pad(currentTestCase, 2)}.txt`,
          {
            cache: "no-cache",
          }
        )
          .then((res) => res.text())
          .then((text) => setOutput(text)),
      ]).finally(() => setSubmitting(false));
    }
  }, [currentTestCase, currentProblemSet]);

  React.useEffect(() => {
    localStorage.setItem("lastCode", code);
  }, [code]);

  React.useEffect(() => {
    if (multiSubmit) {
      setSubmitting(true);
      setAllTestCases({ input: [], output: [] });
      getAllTestcases(currentProblemSet, String(testCases.length))
        .then((items: any) => setAllTestCases(items))
        .finally(() => setSubmitting(false));
    }
  }, [multiSubmit, currentProblemSet, testCases.length]);

  return (
    <>
      <Head>
        <title>ChronoJudge</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <MultiSubmitModal
        result={currentResultIndex !== -1 && multiResult[currentResultIndex]}
        currentResultIndex={currentResultIndex}
        setCurrentResultIndex={setCurrentResultIndex}
      />
      <div
        className="flex flex-col justify-center min-h-screen w-full h-full py-16 px-6 md:px-0"
        style={{ backgroundColor: "#181818" }}
      >
        <Header />
        <JavaEditor code={code} setCode={setCode} />
        <div className="w-full mx-auto max-w-5xl mb-4 flex justify-between mt-2">
          <Checkbox onChange={(e) => setMultiSubmit(e.target.checked)}>
            Check all testcases.
          </Checkbox>
        </div>
        <div className="w-full mx-auto max-w-5xl mb-4 flex flex-col md:flex-row justify-between items-center h-full mt-2 space-y-4 md:space-y-0">
          <Dropdown
            title="Problem Set"
            options={problemSets}
            current={currentProblemSet}
            setCurrent={setCurrentProblemSet}
            placeholder="Select a problem set."
          />
          {!multiSubmit ? (
            <Dropdown
              title="Test Case"
              options={testCases}
              current={currentTestCase}
              setCurrent={setCurrentTestCase}
              placeholder="Select a testcase."
            />
          ) : (
            <div>
              <p>Checking code against all testcases.</p>
              <a
                href="https://github.com/Hzzkygcs/SDA/tree/master/"
                className="hover:underline font-bold"
                target="_blank"
                rel="noreferrer"
              >
                View Test Cases
              </a>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 gap-x-8 w-full mx-auto max-w-5xl mt-2">
          <div>
            <h1 className="text-white font-bold mb-2">Program Input:</h1>
            <Editor
              className="overflow-auto"
              style={{
                width: "100%",
                maxHeight: "16rem",
                borderRadius: "0.5rem",
              }}
              readOnly={multiSubmit}
              value={
                multiSubmit
                  ? "ChronoJudge is in multi-testcase mode. Input is currently locked."
                  : input
              }
              onChange={(e) => setInput(e)}
            />
          </div>
          <div>
            <h1 className="text-white font-bold mb-2">
              Program Output{" "}
              {multiSubmit && "(Details might take awhile to load)"}:
            </h1>
            {!multiSubmit ? (
              <Editor
                className="overflow-auto"
                style={{
                  width: "100%",
                  maxHeight: "16rem",
                  borderRadius: "0.5rem",
                }}
                value={result?.output?.stdout || result?.output?.stderr}
                readOnly={true}
              />
            ) : (
              <>
                <MultiSubmitOutput
                  multiResult={multiResult}
                  setResultIndex={setCurrentResultIndex}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between mx-auto max-w-5xl w-full">
          <RunStatus multiSubmit={multiSubmit} result={result} />
          <div className="mt-2 flex justify-between mb-2 font-bold">
            {multiSubmit ? (
              <p>
                Total Execution Time:{" "}
                {multiResult
                  .reduce(
                    (acc: number, curr: any) => acc + Number(curr.time),
                    0
                  )
                  .toPrecision(4)}
                s
              </p>
            ) : (
              <p>
                Execution Time:{" "}
                {isNaN(result?.time) ? 0 : Number(result?.time).toPrecision(4)}s
              </p>
            )}
          </div>
        </div>
        <div className="mt-2 max-w-5xl w-full mx-auto flex justify-end">
          <Button
            onClick={
              (!submitting &&
                (multiSubmit
                  ? () =>
                      onMultiSubmit(
                        allTestCases,
                        code,
                        currentTimeLimit,
                        handleMultiSubmit,
                        setSubmitting,
                        socket
                      )
                  : () =>
                      onSubmit(
                        input,
                        output,
                        code,
                        setResult,
                        setSubmitting
                      ))) ||
              undefined
            }
            className={`${submitting && "opacity-50"}`}
          >
            Submit
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
