import React from "react";
import Editor from "./Editor";

const JavaEditor: React.FC<{ code: string; setCode: (a: string) => void }> = ({
  code,
  setCode,
}) => {
  return (
    <div className="w-full mx-auto max-w-5xl">
      <h1 className="text-white font-bold mb-2">Enter your code here</h1>
      <Editor
        mode="java"
        style={{
          width: "100%",
          borderRadius: "1rem",
        }}
        onChange={(code) => setCode(code)}
        value={code}
      />
    </div>
  );
};

export default JavaEditor;
