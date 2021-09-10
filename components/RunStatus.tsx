import React from "react";

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

const RunStatus: React.FC<{ result: any; multiSubmit: boolean }> = ({
  result,
  multiSubmit,
}) => {
  return (
    <div className="w-full mx-auto max-w-5xl mt-2 flex justify-between mb-2">
      <p className="text-white font-bold">
        Status: <Status value={result?.message} />
      </p>
      {!multiSubmit && (
        <p className="text-white font-bold">Time: {result?.output?.time}ms</p>
      )}{" "}
    </div>
  );
};

export default RunStatus;
