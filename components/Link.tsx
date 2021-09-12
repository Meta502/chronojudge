import React from "react";
import NextLink from "next/link";

const Link: React.FC<{ href: string; target?: string }> = ({
  children,
  href,
  target,
}) => {
  return (
    <NextLink href={href}>
      <a
        className="transition duration-300 text-blue-400 ml-1 hover:text-blue-500 cursor-pointer"
        rel="noreferrer"
        target={target}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
