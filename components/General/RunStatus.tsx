import React from "react";

export const Status: React.FC<{ value: string; multiSubmit: boolean }> = ({
  value,
  multiSubmit,
}) => {
  return (
    <span
      className={`${
        !multiSubmit && (value === "WA" || value === "TLE") && "text-red-500"
      } ${!multiSubmit && value === "AC" && "text-green-500"} ${
        multiSubmit && "text-yellow-400"
      }`}
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
        Status:{" "}
        <Status
          multiSubmit={multiSubmit}
          value={
            result?.message?.length
              ? result?.message
              : "Waiting for submission..."
          }
        />
      </p>
      {!multiSubmit && (
        <p className="text-white font-bold">
          Time: {result?.output?.time ?? 0}ms
        </p>
      )}{" "}
    </div>
  );
};

export default RunStatus;
