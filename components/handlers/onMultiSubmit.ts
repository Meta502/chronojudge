import toast from "react-hot-toast";
import { gzip } from "pako";
import { Socket } from "socket.io-client";

const onMultiSubmit = (
  cases: { input: string[]; output: string[] },
  code: string,
  timeLimit: number,
  setResult: (a: any) => void,
  setSubmitting: (a: boolean) => void,
  socket: any
) => {
  const runId = Math.floor(Math.random() * 1000000000);
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
        id: runId,
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

  const loadingToast = toast.loading(
    `Submitting... (0/${cases.input.length})`,
    {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    }
  );
  sendRequest()
    .then((item) => {
      if (item.status === 404) {
        toast.error("An error occurred in ChronoJudge", { id: loadingToast });
        throw Error();
      }
      return item.json();
    })
    .then((item) => setResult(item))
    .finally(() => {
      setSubmitting(false);
      toast.dismiss(loadingToast);
      toast.success("Finished testing your code!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
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
    })
    .catch(() => undefined);

  socket.on("progress", (data: any) => {
    if (data.id === runId) {
      toast.loading(`Submitting... (${data.case}/${cases.input.length})`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        id: loadingToast,
      });
    }
  });
};

export default onMultiSubmit;
