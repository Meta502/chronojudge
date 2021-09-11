import React from "react";
import Chronos from "./Chronos";

const Header = () => (
  <div className="w-full mx-auto max-w-5xl flex items-center justify-center mb-4">
    <Chronos />
    <h1 className="font-bold text-2xl ml-4">ChronoJudge</h1>
  </div>
);

export default Header;
