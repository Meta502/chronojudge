import { useEffect, useState } from "react";
import { useSocketContext } from "./hooks/useSocket";

const Footer = () => {
  const socket = useSocketContext();
  const [serverState, setServerState] = useState({
    status: "Down",
    cpuUsage: 0,
  });

  useEffect(() => {
    if (socket) {
      const interval = setInterval(() => socket.emit("get-status"), 5000);
      socket.on("status", (data) => {
        setServerState(data);
      });
      return () => clearInterval(interval);
    }
  }, [socket]);
  return (
    <div
      className="w-full flex items-center bg-white h-12"
      style={{ backgroundColor: "#242424" }}
    >
      <div className="w-full px-8 flex justify-between items-center">
        <div className="text-xs">
          <p className="flex space-x-2">
            <span>Status:</span>
            <span className="flex items-center">
              <div
                className={`w-2 h-2 mr-1 rounded-full ${
                  serverState.status === "Alive" && "bg-green-500"
                } ${serverState.status === "Down" && "bg-red-500"}`}
              ></div>
              {serverState.status}
            </span>
          </p>
          <p>Server CPU Usage: {serverState.cpuUsage}%</p>
        </div>
        <div className="flex space-x-8 text-sm select-none items-center">
          <a className="transition duration-300 text-blue-400 ml-1 hover:text-blue-500 cursor-pointer">
            Credits
          </a>
          <a
            href="https://github.com/Meta502/chronojudge"
            className="transition duration-300 text-blue-400 ml-1 hover:text-blue-500 cursor-pointer"
            target="_blank"
            rel="noreferrer"
          >
            Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
