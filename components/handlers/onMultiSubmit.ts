import toast from "react-hot-toast";

const onMultiSubmit = (
  cases: { input: string[]; output: string[] },
  code: string,
  setResult: (a: any) => void
) => {
  if (!("input" in cases) || !("output" in cases)) {
    window.alert("Please choose a problem set.");
    return;
  }
  toast.promise(
    fetch("http://localhost:3006/code/multi", {
      method: "POST",
      body: JSON.stringify({
        code,
        input: cases.input,
        output: cases.output,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((item) => item.json())
      .then((item) => setResult(item)),
    {
      loading: "Submitting...",
      success: "Finished testing your code!",
      error: "An error occurred in ChronoJudge.",
    },
    {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    }
  );
};

export default onMultiSubmit;
