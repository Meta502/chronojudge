import React from "react";

import { Button } from "@chakra-ui/button";
import { Status } from "../General/RunStatus";

const MultiSubmitOutput: React.FC<{
  multiResult: any;
  setResultIndex: (a: number) => void;
}> = ({ multiResult, setResultIndex }) => {
  return (
    <div
      className="w-full h-full overflow-auto p-4 space-y-4"
      style={{
        maxHeight: "16rem",
        borderRadius: "0.5rem",
        backgroundColor: "#1C1C1C",
      }}
    >
      {multiResult?.map((item: any, index: number) => {
        return (
          <div
            className="flex justify-between items-center w-full p-4"
            key={index}
            style={{
              backgroundColor: "#262424",
              borderRadius: "0.5rem",
            }}
          >
            <div className="font-bold">
              Test Case #{index + 1}:{" "}
              <Status value={item?.message} multiSubmit={false} />
            </div>
            {item.message !== "AC" && (
              <Button onClick={() => setResultIndex(index)}>Details</Button>
            )}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default MultiSubmitOutput;
