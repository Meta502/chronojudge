const baseUrl =
  "https://raw.githubusercontent.com/Meta502/chronojudge/main/problem_sets";

const getAllTestcases = async (problemSet: string, numberOfCases: string) => {
  const inputRequests = [...new Array(Number(numberOfCases))].map(
    (item, index) => {
      return fetch(`${baseUrl}/${problemSet}/in${index + 1}.txt`, {
        cache: "no-cache",
      })
        .then((res) => res.text())
        .then((item: string) => {
          return item;
        });
    }
  );

  const outputRequests = [...new Array(Number(numberOfCases))].map(
    (item, index) => {
      return fetch(`${baseUrl}/${problemSet}/output${index + 1}.txt`, {
        cache: "no-cache",
      })
        .then((res) => res.text())
        .then((item: string) => {
          return item;
        });
    }
  );

  const inputs = await Promise.all(inputRequests);
  const outputs = await Promise.all(outputRequests);

  return { inputs, outputs };
};

export default getAllTestcases;
