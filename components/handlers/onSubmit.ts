const onSubmit = (
  input: string,
  output: string,
  code: string,
  setResult: (a: any) => void
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
  fetch("http://localhost:3006/code/submit", {
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
    .then((item) => setResult(item));
};

export default onSubmit;
