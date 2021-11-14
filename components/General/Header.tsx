import React from "react";
import Chronos from "./Chronos";
import Link from "./Link";

const Header = () => (
  <>
    <div className="w-full mx-auto max-w-5xl flex items-center justify-center mb-4">
      <Chronos />
      <h1 className="font-bold text-2xl ml-4">ChronoJudge</h1>
    </div>
    <p className="mx-auto font-semibold text-center">
      Check out this program-based grader by HzzkyGcs (better for running large
      testcases)
      <br />
      <Link target="_blank" href="https://github.com/Hzzkygcs/SDA/releases/">
        HzzGrader
      </Link>
    </p>
  </>
);

export default Header;
