import toast from "react-hot-toast";
import { gzip } from "pako";

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

  const sendRequest = async () => {
    const content = await gzip(
      JSON.stringify({
        code,
        input: cases.input,
        output: cases.output,
        timeLimit: timeLimit,
      }),
      { to: "string" }
    );

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/code/multi`, {
      method: "POST",
      body: content,
      headers: new Headers({
        "Content-Encoding": "gzip",
        "Content-Type": "application/json",
      }),
    });
  };
  toast
    .promise(
      sendRequest()
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
    )
    .finally(() => {
      window?.gtag?.("event", "code_submit", {
        event_category: "code",
        event_label: "Single Code Submission",
      });
      toast("NOTE: TC belum tentu mengcover seluruh kemungkinan.", {
        duration: 7500,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });
};

export default onMultiSubmit;
