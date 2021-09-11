import toast from "react-hot-toast";

const onSubmit = (
  input: string,
  output: string,
  code: string,
  setResult: (a: any) => void,
  setSubmitting: (a: boolean) => void
) => {
  if (
    input === "" ||
    input === "404: Not Found" ||
    output === "" ||
    output === "404: Not Found"
  ) {
    window.alert("Please choose a testcase.");
    return;
  }
  setResult({
    message: "Loading...",
  });
  setSubmitting(true);
  toast.promise(
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/submit`, {
      method: "POST",
      body: JSON.stringify({
        code,
        input,
        output,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((item) => item.json())
      .then((item) => setResult(item))
      .finally(() => setSubmitting(false)),
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

export default onSubmit;
