const Footer = () => (
  <div
    className="w-full flex items-center bg-white h-12"
    style={{ backgroundColor: "#242424" }}
  >
    <div className="w-full px-8 flex justify-between">
      <p className="text-sm">Made by Chronos, for Chronos. </p>
      <div className="space-x-8 text-sm select-none">
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

export default Footer;
