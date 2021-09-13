import toast from "react-hot-toast";

const onMultiSubmit = (
  cases: { input: string[]; output: string[] },
  code: string,
  timeLimit: number,
  setResult: (a: any) => void,
  setSubmitting: (a: boolean) => void
) => {
  if (
    !cases.input.length ||
    !cases.output.length ||
    cases.input.some((item) => item === null || item === undefined) ||
    cases.output.some((item) => item === null || item === undefined)
  ) {
    toast.error("Please choose a valid problem set.", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return;
  }

  setSubmitting(true);
  setResult([]);
  toast.promise(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/multi`, {
      method: "POST",
      body: JSON.stringify({
        code,
        input: cases.input,
        output: cases.output,
        timeLimit,
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
      .finally(() => setSubmitting(false))
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
