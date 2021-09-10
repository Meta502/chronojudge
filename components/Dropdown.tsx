import React from "react";
import { Select } from "@chakra-ui/react";

const Dropdown: React.FC<{
  current: string;
  setCurrent: (e: string) => void;
  options: string[];
  title: string;
  placeholder: string;
}> = ({ current, setCurrent, options, title, placeholder }) => {
  return (
    <div className="w-full md:w-64">
      <h1 className="text-white font-bold mb-2">{title}</h1>
      <Select
        placeholder={placeholder}
        size="md"
        variant="filled"
        onChange={(e) => setCurrent(e.target.value)}
        value={current}
      >
        {options.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
