import { useEffect, useState } from "react";
import { useSocketContext } from "../hooks/useSocket";
import Link from "./Link";

const Footer = () => {
  const socket = useSocketContext();
  const [serverState, setServerState] = useState({
    status: "Down",
    cpuUsage: 0,
    server: "Not Connected",
  });

  useEffect(() => {
    if (socket) {
      socket.emit("get-status");
      const interval = setInterval(() => socket.emit("get-status"), 2500);
      socket.on("status", (data) => {
        setServerState(data);
      });
      socket.on("progress", (data) => {
        console.log(data);
      });
      return () => clearInterval(interval);
    }
  }, [socket]);
  return (
    <div
      className="w-full flex items-center bg-white h-16"
      style={{ backgroundColor: "#242424" }}
    >
      <div className="w-full px-8 flex justify-between items-center">
        <div className="text-xs">
          <p className="flex space-x-2">
            <span>Status:</span>
            <span className="flex items-center">
              <span
                className={`w-2 h-2 mr-1 rounded-full ${
                  serverState.status === "Alive" && "bg-green-500"
                } ${serverState.status === "Down" && "bg-red-500"} ${
                  serverState.status === "High Load" && "bg-yellow-500"
                }`}
              ></span>
              {serverState.status}{" "}
              {serverState.status === "High Load" &&
                "(results may be inaccurate)."}
            </span>
          </p>
          <p>
            Server: {serverState.server} ({serverState.cpuUsage}%)
          </p>
        </div>
        <div className="flex space-x-8 text-sm select-none items-center">
          <Link href="/">Home</Link>
          <Link href="/credits">Credits</Link>
          <Link target="_blank" href="https://github.com/Meta502/chronojudge">
            Repository
          </Link>
          <Link href="/donate">Donate</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
