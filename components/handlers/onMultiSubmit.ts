import toast from "react-hot-toast";

const onMultiSubmit = (
  cases: { input: string[]; output: string[] },
  code: string,
  setResult: (a: any) => void
) => {
  if (!cases.input.length || !cases.output.length) {
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
      .then((item) => {
        if (item.status === 404) throw Error();
        return item.json();
      })
      .then((item) => setResult(item))
      .catch(() => undefined),
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
