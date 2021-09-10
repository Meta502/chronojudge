import React from "react";

const Status: React.FC<{ value: string; multiSubmit: boolean }> = ({
  value,
  multiSubmit,
}) => {
  return (
    <span
      className={`${(value === "WA" || value === "TLE") && "text-red-500"} ${
        value === "AC" && "text-green-500"
      } ${multiSubmit && "text-yellow-400"}`}
    >
      {multiSubmit ? "ChronoJudge is in multi test case mode." : value}
    </span>
  );
};

const RunStatus: React.FC<{ result: any; multiSubmit: boolean }> = ({
  result,
  multiSubmit,
}) => {
  return (
    <div className="w-full mx-auto max-w-5xl mt-2 flex justify-between mb-2">
      <p className="text-white font-bold">
        Status: <Status multiSubmit={multiSubmit} value={result?.message} />
      </p>
      {!multiSubmit && (
        <p className="text-white font-bold">Time: {result?.output?.time}ms</p>
      )}{" "}
    </div>
  );
};

export default RunStatus;
