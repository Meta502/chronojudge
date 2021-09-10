import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

import { Button } from "@chakra-ui/react";

const Editor = dynamic(import("../components/Editor"), {
  ssr: false,
});

const Status: React.FC<{ value: string }> = ({ value }) => {
  return (
    <span
      className={`${(value === "WA" || value === "TLE") && "text-red-500"}`}
    >
      {value}
    </span>
  );
};

const Home: NextPage = () => {
  const [code, setCode] = React.useState("");
  const [result, setResult] = React.useState<any>({});
  const [currentProblemSet, setCurrentProblemSet] = React.useState<any>({});

  React.useEffect(() => {
    console.log(code);
  }, [code]);

  const onSubmit = () => {
    fetch("http://localhost:3006/code/submit", {
      method: "POST",
      body: JSON.stringify({
        code,
        input: "",
        output: "",
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((item) => item.json())
      .then((item) => setResult(item));
  };

  return (
    <div className="flex flex-col justify-center bg-gray-800 min-h-screen w-full h-full">
      <div className="w-full mx-auto max-w-5xl">
        <h1 className="text-white font-bold">Enter your code here</h1>
        <Editor
          mode="java"
          style={{ width: "100%" }}
          onChange={(code) => setCode(code)}
        />
      </div>
      <div className="w-full mx-auto max-w-5xl mt-2 flex justify-between">
        <p className="text-white font-bold">
          Status: <Status value={result?.message} />
        </p>
        <p className="text-white font-bold">Time: {result?.output?.time}ms</p>
      </div>
      <div className="grid grid-cols-2 gap-x-8 w-full mx-auto max-w-5xl mt-2">
        <div>
          <h1 className="text-white font-bold">Input:</h1>
          <Editor
            className="overflow-auto"
            style={{ width: "100%", maxHeight: "16rem" }}
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
      <div className="mt-2 max-w-5xl w-full mx-auto flex justify-end">
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Home;
