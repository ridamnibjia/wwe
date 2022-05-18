import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/Link";
import NewsBadge from "../common/NewsBadge";
import truncateString from "../../utils/helpers/truncateString";
import Skeleton from "../common/Skeleton";
import useFormatNewsItemData from "../../hooks/useFormatNewsItemData";
import { ThemeContext } from "../context/themeContext";

interface NewsItemProps {
  data?: { [key: string]: any };
  isLoading: boolean;
  noResponsive?: boolean;
  type: string
}

function NewsItem({ type, data, isLoading, noResponsive }: NewsItemProps) {
  const { theme } = useContext(ThemeContext)
  const isThemeDark = theme
  const [primaryCategoryName, postPreview, srcSetImage] = useFormatNewsItemData(3, data);

  return (
    <>

      {type === 'footernews' || type === 'homePageRumor' ?

        <Link href={data?.uri || '#'}>
          <div className={`${theme === 'light' ? 'border-gray-200 text-[#222] bg-[#fff]' : 'border-main-black bg-light-black text-[#efefef] '} cursor-pointer footer ka newss relative max-w-sm border rounded overflow-hidden shadow-lg`}>
            <img className="w-full" src={srcSetImage} alt="Sunset in the mountains" />
            <div className="max-w-[120px] absolute left-[10px] top-[10px]">
              {!isLoading ? (
                <>
                  {primaryCategoryName && <NewsBadge small={true} text={primaryCategoryName} />}
                </>
              ) : (
                <Skeleton width={60} height={20} />
              )}
            </div>
            <div className="px-6 py-4">
              {type === 'homePageRumor' ? (
                <h3
                  style={{ textDecorationColor: '#ce061e' }}
                  className={`leading-[18px] 2xl:w-[95%] cursor-pointer sm:leading-[25px] hover:underline text-[18px] tracking-[0.32px] sm:tracking-normal sm:text-[22px] font-semibold ${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'}`}
                >
                  {!isLoading ? <span>{truncateString(data?.title, 100)}</span> : <Skeleton />}
                </h3>
              ) : (
                <h3
                  style={{ textDecorationColor: '#ce061e' }}
                  className={`leading-[18px] 2xl:w-[90%] cursor-pointer sm:leading-[25px] hover:underline text-[18px] tracking-[0.32px] sm:tracking-normal sm:text-[22px] font-semibold ${theme === 'light' ? 'text-[#444]' : 'text-[#efefef]'}`}
                >
                  {!isLoading ? <span>{truncateString(data?.title, 40)}</span> : <Skeleton />}
                </h3>
              )}

              {type === 'homePageRumor' ? '' :
                <p
                  className={`text-md  2xl:w-[95%] mt-2`}
                >
                  {!isLoading ? <span>{postPreview}</span> : <Skeleton count={3} />}
                </p>
              }
            </div>

          </div>
        </Link>
        :
        <Link href={data?.uri || "#"}>
          <a className="block">
            <section className={`flex items-center bg-white xsm:p-2 md:p-3 rounded-md shadow-md overflow-hidden ${theme === 'light' ? 'text-[#222] bg-[#fff]' : 'bg-light-black text-[#efefef] '}`}>

              <div className="overflow-hidden rounded-md w-[30%] h-[100%]">
                {!isLoading && srcSetImage ? (
                  <img className="object-cover w-full h-full" alt={data?.featuredImage.node.altText} src={srcSetImage} />
                ) : (
                  <Skeleton className="inset-0 !rounded-none" />
                )}
              </div>
              <div className="flex-1  flex flex-col xsm:pl-2 3xl:pl-6">
                <div className="flex mb-2 items-center justify-end">
                  {!isLoading ? (
                    <>
                      {primaryCategoryName && <NewsBadge small={false} text={primaryCategoryName} />}
                    </>
                  ) : (
                    <Skeleton width={60} height={20} />
                  )}
                </div>

                <h3
                  style={{ textDecorationColor: '#ce061e' }}
                  className={`leading-[18px] xsm:hidden sm:flex 2xl:w-[90%]  cursor-pointer sm:leading-[25px] hover:underline text-[18px] tracking-[0.32px] xsm:tracking-normal xsm:text-[22px] font-semibold ${theme === 'light' ? " text-[#333]" : 'text-white'
                    }`}
                >
                  {!isLoading ? <span>{truncateString(data?.title, 66)}</span> : <Skeleton />}
                </h3>
                <h3
                  style={{ textDecorationColor: '#ce061e' }}
                  className={`leading-[18px] xsm:flex sm:hidden  cursor-pointer hover:underline text-[18px] tracking-[0.32px] font-semibold ${theme === 'light' ? " text-[#333]" : 'text-white'
                    }`}
                >
                  {!isLoading ? <span>{truncateString(data?.title, 66)}</span> : <Skeleton />}
                </h3>

                <p
                  className={`text-md  2xl:w-[100%] mt-2 flex-col xsm:hidden md:flex lg:hidden 3xl:flex flex-1 leading-4 ${theme === 'light' ? "text-[#333]" : 'text-[#efefef]'
                    }`}
                >
                  {!isLoading ? <span>{postPreview}</span> : <Skeleton count={3} />}
                </p>

              </div>
            </section>
          </a >
        </Link >
      }

    </>
  );
}

export default NewsItem;
