import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

import { Button, Select } from "@chakra-ui/react";

const baseUrl =
  "https://raw.githubusercontent.com/Meta502/chronojudge/main/problem_sets";

const Editor = dynamic(import("../components/Editor"), {
  ssr: false,
});

const Status: React.FC<{ value: string }> = ({ value }) => {
  return (
    <span
      className={`${(value === "WA" || value === "TLE") && "text-red-500"} ${
        value === "AC" && "text-green-500"
      }`}
    >
      {value}
    </span>
  );
};

const Home: NextPage = () => {
  const [code, setCode] = React.useState("");
  const [result, setResult] = React.useState<any>({});
  const [problemSets, setProblemSets] = React.useState<any>([]);
  const [testCases, setTestCases] = React.useState<any>([]);

  const [currentTestCase, setCurrentTestCase] = React.useState<any>();
  const [currentProblemSet, setCurrentProblemSet] = React.useState<any>("");

  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    fetch(`${baseUrl}/index.txt`)
      .then((res) => res.text())
      .then((text) => setProblemSets(text.split("\n")));
  }, []);

  React.useEffect(() => {
    if (currentProblemSet) {
      fetch(`${baseUrl}/${currentProblemSet}/num.txt`, { cache: "no-cache" })
        .then((res) => res.text())
        .then((item: string) => {
          // @ts-ignore
          !isNaN(item) &&
            setTestCases(
              [...new Array(Number(item))].map(
                (item: any, index: number) => index + 1
              )
            );
          setCurrentTestCase("");
        });
    }
  }, [currentProblemSet]);

  React.useEffect(() => {
    if (currentProblemSet && currentTestCase) {
      fetch(`${baseUrl}/${currentProblemSet}/in${currentTestCase}.txt`, {
        cache: "no-cache",
      })
        .then((res) => res.text())
        .then((text) => setInput(text));

      fetch(`${baseUrl}/${currentProblemSet}/output${currentTestCase}.txt`, {
        cache: "no-cache",
      })
        .then((res) => res.text())
        .then((text) => setOutput(text));
    }
  }, [currentTestCase]);

  const onSubmit = () => {
    setResult({});
    fetch("http://localhost:3006/code/submit", {
      method: "POST",
      body: JSON.stringify({
        code,
        input,
        output,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((item) => item.json())
      .then((item) => setResult(item));
  };

  return (
    <div className="flex flex-col justify-center bg-gray-800 min-h-screen w-full h-full py-16">
      <div className="w-full mx-auto max-w-5xl">
        <h1 className="text-white font-bold mb-2">Enter your code here</h1>
        <Editor
          mode="java"
          style={{ width: "100%" }}
          onChange={(code) => setCode(code)}
        />
      </div>
      <div className="w-full mx-auto max-w-5xl mb-4 flex justify-between mt-2">
        <div className="w-64">
          <h1 className="text-white font-bold mb-2">Problem Set</h1>
          <Select
            placeholder="Select a problem set."
            size="md"
            variant="outline bg-white"
            onChange={(e) => setCurrentProblemSet(e.target.value)}
          >
            {problemSets.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-64">
          <h1 className="text-white font-bold mb-2">Test Case</h1>
          <Select
            placeholder="Select a testcase."
            size="md"
            variant="outline bg-gray-500"
            onChange={(e) => setCurrentTestCase(e.target.value)}
            value={currentTestCase}
          >
            {testCases.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 w-full mx-auto max-w-5xl mt-2">
        <div>
          <h1 className="text-white font-bold">Input:</h1>
          <Editor
            className="overflow-auto"
            style={{ width: "100%", maxHeight: "16rem" }}
            value={input}
            onChange={(e) => setInput(e)}
          />
        </div>
        <div>
          <h1 className="text-white font-bold">Output:</h1>
          <Editor
            className="overflow-auto"
            style={{ width: "100%", maxHeight: "16rem" }}
            value={result?.output?.stdout}
          />
        </div>
      </div>
      <div className="w-full mx-auto max-w-5xl mt-2 flex justify-between mb-2">
        <p className="text-white font-bold">
          Status: <Status value={result?.message} />
        </p>
        <p className="text-white font-bold">Time: {result?.output?.time}ms</p>
      </div>
      <div className="mt-2 max-w-5xl w-full mx-auto flex justify-end">
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Home;
