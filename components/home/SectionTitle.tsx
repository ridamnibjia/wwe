import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

interface SectionTitleProps {
  title: string;
  className?: string;
  labelPosition?: "right" | "left" | "center";
}

const labelPositionClassNames = {
  right: "justify-end",
  left: "justify-start",
  center: "justify-center",
};

function SectionTitle({ title, className, labelPosition = "left" }: SectionTitleProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <div className="xsm:hidden md:flex items-center  mb-1 mx-4 lg:mx-0">
        <h2 className={`flex ${labelPositionClassNames[labelPosition]}`}>
          <span
            className={`${labelPosition === "center" ? "px-2" : labelPosition === "right" ? "pl-2" : "pr-2"
              } pr-4  text-2xl lg:text-xl font-semibold uppercase ${className} ${theme === 'light' ? 'bg-[#e4e6ed] text-[#222]' : 'bg-main-black text-[#efefef]'}`}
          >
            {title}
          </span>
        </h2>
        <div className="border w-full flex-1 h-[2px] border-main"></div>
      </div>
      <div className="xsm:flex mt-2 md:hidden flex-col justify-center items-center w-full relative mb-1  lg:mx-0">

        <h2 className={`${theme === 'light' ? 'text-[#111]' : 'text-[#fafafa]'} text-xl font-semibold text-center`}>
          {title}
        </h2>
        <div className="bg-[#ce061e] h-[2px] w-[50%]"></div>
      </div>
    </>
  );
}

export default SectionTitle;
