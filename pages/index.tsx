import type { NextPage } from "next";

import React from "react";
import dynamic from "next/dynamic";

import { Button } from "@chakra-ui/react";

import Chronos from "../components/Chronos";
import Dropdown from "../components/Dropdown";
import RunStatus from "../components/RunStatus";

import onSubmit from "../components/handlers/onSubmit";

const baseUrl =
  "https://raw.githubusercontent.com/Meta502/chronojudge/main/problem_sets";

const Editor = dynamic(import("../components/Editor"), {
  ssr: false,
});

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
    const code = localStorage.getItem("lastCode");
    fetch(`${baseUrl}/index.txt`)
      .then((res) => res.text())
      .then((text) => setProblemSets(text.split("\n")));
    if (code) setCode(code);
  }, []);

  React.useEffect(() => {
    if (currentProblemSet) {
      setTestCases([]);
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
  }, [currentTestCase, currentProblemSet]);

  React.useEffect(() => {
    localStorage.setItem("lastCode", code);
  }, [code]);

  return (
    <div
      className="flex flex-col justify-center min-h-screen w-full h-full py-16"
      style={{ backgroundColor: "#181818" }}
    >
      <div className="w-full mx-auto max-w-5xl flex items-center justify-center mb-4">
        <Chronos />
        <h1 className="font-bold text-2xl ml-4">ChronoJudge</h1>
      </div>

      <div className="w-full mx-auto max-w-5xl">
        <h1 className="text-white font-bold mb-2">Enter your code here</h1>
        <Editor
          mode="java"
          style={{ width: "100%" }}
          onChange={(code) => setCode(code)}
          value={code}
        />
      </div>
      <div className="w-full mx-auto max-w-5xl mb-4 flex justify-between mt-2">
        <Dropdown
          title="Problem Set"
          options={problemSets}
          current={currentProblemSet}
          setCurrent={setCurrentProblemSet}
          placeholder="Select a problem set."
        />
        <Dropdown
          title="Test Case"
          options={testCases}
          current={currentTestCase}
          setCurrent={setCurrentTestCase}
          placeholder="Select a testcase."
        />
      </div>
      <div className="grid grid-cols-2 gap-x-8 w-full mx-auto max-w-5xl mt-2">
        <div>
          <h1 className="text-white font-bold">Program Input:</h1>
          <Editor
            className="overflow-auto"
            style={{ width: "100%", maxHeight: "16rem" }}
            value={input}
            onChange={(e) => setInput(e)}
          />
        </div>
        <div>
          <h1 className="text-white font-bold">Program Output:</h1>
          <Editor
            className="overflow-auto"
            style={{ width: "100%", maxHeight: "16rem" }}
            value={result?.output?.stdout}
            readOnly={true}
          />
        </div>
      </div>
      <RunStatus result={result} />
      <div className="mt-2 max-w-5xl w-full mx-auto flex justify-end">
        <Button onClick={() => onSubmit(input, output, code, setResult)}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
