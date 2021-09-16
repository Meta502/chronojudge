import { pad } from "../../pages";

const baseUrl =
  "https://raw.githubusercontent.com/Hzzkygcs/SDA/master/ChronoJudge";

const getAllTestcases = async (problemSet: string, numberOfCases: string) => {
  const inputRequests = [...new Array(Number(numberOfCases))].map(
    (item, index) => {
      return fetch(`${baseUrl}/${problemSet}/in_${pad(index, 2)}.txt`, {
        cache: "no-cache",
      })
        .then((res) => {
          if (res.status === 404) throw Error();
          return res.text();
        })
        .then((item: string) => {
          return item;
        })
        .catch(() => undefined);
    }
  );

  const outputRequests = [...new Array(Number(numberOfCases))].map(
    (item, index) => {
      return fetch(`${baseUrl}/${problemSet}/out_${pad(index, 2)}.txt`, {
        cache: "no-cache",
      })
        .then((res) => {
          if (res.status === 404) throw Error();
          return res.text();
        })
        .then((item: string) => {
          return item;
        })
        .catch(() => undefined);
    }
  );

  const input = await Promise.all(inputRequests);
  const output = await Promise.all(outputRequests);

  return { input, output };
};

export default getAllTestcases;
