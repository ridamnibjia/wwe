import React, { useContext } from "react";
import { RiStarFill } from "react-icons/ri";
import { ThemeContext } from "../context/themeContext";

function SpecialEvents({ specialEvents }: { specialEvents: Array<string> }) {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme === 'light' ? 'border-gray-200 text-[#222] bg-[#fff]' : 'border-main-black bg-light-black text-[#efefef]'} max-h-[460px] overflow-y-scroll w-full`}>
      {specialEvents.map(specialEvent => (
        <>
          <div className={`${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#555]'} mb-2 p-1 flex items-center`}>
            <div className="bg-[#ce061e]  mr-2 w-full flex flex-col items-center justify-center text-center text-[#fff] w-[50px] h-[50px] rounded-lg">
              <p className="text-sm">{specialEvent.split('-')[1].trim().split(' ')[0]}</p>
              <p className="text-xl font-bold mt-[-5px]">{specialEvent.split('-')[1].trim().split(' ')[1]}</p>
            </div>
            <p className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef] '} text-lg font-semibold`}>{specialEvent.split('-')[0]}</p>
          </div>

        </>
      ))}


    </div>
  );
}

export default SpecialEvents;
