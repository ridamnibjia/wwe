import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import NewsBadge from "../common/NewsBadge";
import useFormatNewsItemData from "../../hooks/useFormatNewsItemData";
import Skeleton from "../common/Skeleton";
import { ThemeContext } from "../context/themeContext";

interface MainImageNewsProps {
  data: { [key: string]: any };
  categoryBadge?: boolean;
  isLoading: boolean;
  size?: "sm" | "lg";
}

function MainImageNews({ categoryBadge, size = "sm", data, isLoading }: MainImageNewsProps) {
  const [primaryCategoryName, _, srcSetImage] = useFormatNewsItemData(size === "sm" ? 3 : 1, data);
  const { theme } = useContext(ThemeContext)
  return (
    <article className={`cursor-pointer bg-white pb-1 w-full lg:rounded  ${theme === 'light' ? 'text-[#222] bg-[#fff]  shadow-post  ' : 'bg-light-black text-[#efefef] shadow-lg '}`}  >
      <Link href={data?.uri || "#"}>
        <a>
          <img className="w-full group" alt={data?.featuredImage.node.altText} src={srcSetImage} />
          <h3 style={{ textDecorationColor: '#ce061e', borderLeft: '4px solid #ce061e' }} className={`xsm:text-lg md:text-2xl hover:underline group-hover:border-b md:p-3 xsm:p-1  m-2 mt-2 font-bold leading-[20px] ${theme === 'light' ? 'text-[#222] bg-[#fff]' : 'bg-light-black text-[#efefef] '}`} >
            <span>{data?.title}</span>
          </h3>
        </a>

      </Link>


    </article >
  );
}

export default MainImageNews;
