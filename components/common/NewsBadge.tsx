import React from "react";

interface NewsBadgeProps {
  text: string;
  colorText?: "red" | "white";
  small: Boolean
}

function NewsBadge({ small, text, colorText = "red" }: NewsBadgeProps) {
  return (
    <>
      {small ?
        <div className="rounded-full bg-[#ce061e] py-[2px] text-[10px] font-semibold px-4 text-white  uppercase ">
          {text}
        </div> :
        <div className="rounded-full bg-[#ce061e] md:py-[2px] xsm:py-[2px] xsm:text-[9px] md:text-[12px] font-semibold xsm:px-3 md:px-6 text-white  uppercase ">
          {text}
        </div>}
    </>

  );
}

export default NewsBadge;
