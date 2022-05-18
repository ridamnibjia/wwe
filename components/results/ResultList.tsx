import React, { useContext, useEffect } from 'react';
import Skeleton from '../common/Skeleton';
import useFormatNewsItemData from '../../hooks/useFormatNewsItemData';
import Pagination from '../common/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import truncateString from '../../utils/helpers/truncateString';
import request from 'graphql-request';
import { useMemo } from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import useSWROptions from '../../utils/constants/useSWROptions';
import { useRouter } from 'next/router';
import { ThemeContext } from '../context/themeContext';
import NewsBadge from '../common/NewsBadge';

const RESULT_PER_PAGE = 10;

interface ResultListProps {
  query: (offset: number) => string;
  emptyResultsLabel?: string;
}

const fetcher = (query: string) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, query);

function ResultList({ query, emptyResultsLabel }: ResultListProps) {
  const [offset, setOffset] = useState<number>(0);

  const {
    data: resultData,
    error: featuredArticlesError,
    isValidating,
  } = useSWR(query(offset), fetcher, useSWROptions);

  const hasMore = resultData?.posts.pageInfo.offsetPagination.hasMore;
  const hasPrevious = resultData?.posts.pageInfo.offsetPagination.hasPrevious;
  const total = resultData?.posts.pageInfo.offsetPagination.total;
  console.log(
    '🚀 ~ file: ResultList.tsx ~ line 34 ~ ResultList ~ hasMore',
    hasMore
  );
  console.log(
    '🚀 ~ file: ResultList.tsx ~ line 35 ~ ResultList ~ hasPrevious',
    hasPrevious
  );
  console.log(
    '🚀 ~ file: ResultList.tsx ~ line 35 ~ ResultList ~ total',
    total
  );

  const totalPages = useMemo(() => {
    return Math.ceil(total / RESULT_PER_PAGE);
  }, [total]);

  const actualPage = useMemo(() => {
    return offset / RESULT_PER_PAGE + 1;
  }, [offset]);

  const onClickNext = () => {
    window.scrollTo(0, 0);
    setOffset((prev) => prev + RESULT_PER_PAGE);
  };

  const onClickPrevious = () => {
    setOffset((prev) => prev - RESULT_PER_PAGE);
  };
  const { theme } = useContext(ThemeContext)



  return (
    <>
      <div className={`${theme === 'light' ? 'bg-[e4e4e4]' : 'bg-dark-black'}  lg:grid grid-cols-6 mb-8 }`}>
        <main className="col-span-8 px-1 xsm:space-y-3 md:space-y-5">
          {!isValidating
            ? resultData?.posts.edges.map((newsData: any, i: number) => (
              <ResultItem offset={offset} key={i} data={newsData.node} isLoading={false} />
            ))
            : new Array(12)
              .fill('1')
              .map((x, i) => <ResultItem key={i} isLoading />)}

          {!isValidating &&
            resultData &&
            resultData.posts.edges.length === 0 && (
              <h2 className="font-medium text-3xl">
                {emptyResultsLabel || 'No post found.'}
              </h2>
            )}
        </main>
        <div className="hidden lg:block col-span-2 px-5 border"></div>
      </div>
      <Pagination
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
        totalResults={total}
        nextDisabled={!hasMore}
        actualPage={actualPage}
        numPages={totalPages}
        prevDisabled={!hasPrevious}
      />
    </>
  );
}

interface ResultItemProps {
  data?: { [key: string]: any };
  isLoading: boolean;
  offset?: Number;
}

function ResultItem({ data, offset, isLoading }: ResultItemProps) {
  console.log('🚀 ~ file: ResultList.tsx ~ line 107 ~ ResultItem ~ data', data);
  const [categoryName, postPreview, srcSetImage] = useFormatNewsItemData(
    3,
    data
  );
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const [category, setCategory] = useState('')
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCategory(window.location.pathname?.split('/')[1])
    }
  }, [router.pathname])


  const firstSlug = router.pathname.split('/')[1]
  const queries = `?source=${firstSlug === 'search' ? 'searchPage' :
    router.query?.source === 'searchPage' ? 'searchPage' : firstSlug === 'author' ? 'authorPage' : router.query?.source === 'author' ? 'authorPage' : firstSlug === 'tag' ? 'tagPage' : router.query.source === 'tag' ? 'tagPage' : 'categoryPage'}&&${firstSlug === 'search' ?
      `query=${router.query.q != undefined ? router.query.q : router.query.query}` : router.query?.source === 'searchPage' ?
        `query=${router.query.q != undefined ? router.query.q : router.query.query}` :
        firstSlug === 'author' ?
          `author=${firstSlug != undefined ? firstSlug : router.query.author}` : router.query?.source === 'authorPage' ?
            `author=${router.query.author != undefined ? router.query.author : router.query.author}` :
            firstSlug === 'tag' ?
              `tag=${firstSlug != undefined ? firstSlug : router.query.tag}` : router.query?.source === 'tagPage' ?
                `tag=${router.query.tag != undefined ? router.query.tag : router.query.tag}` :
                `category=${firstSlug != undefined && category}`}`
  return (
    <article className={`${theme === 'light' ? 'bg-white border-gray-100' : 'bg-light-black border-main-black'} xsm:p-2 md:p-3  w-full shadow-lg flex items-center max-h-[190px] overflow-hidden shadow-sm rounded-md border `}>
      <div className="mr-2">
        <Link href={data?.uri + queries || '#'}>
          <div className="md:max-w-[200px] lg:max-w-[160px]  lg:min-w-[190px] 3xl:min-w-[256px] 3xl:max-w-[200px] xsm:max-w-[150px] xsm:min-w-[160px] xsm:min-h-[90px] rounded-md overflow-hidden  max-h-[144px]">
            {!isLoading && srcSetImage ? (
              <img
                src={srcSetImage}
                width={'100%'}
                height={'100%'}
                alt={data?.featuredImage.node.altText}
                className="object-cover z-10 rounded-sm w-full h-full"
              />
            ) : (
              <Skeleton className="inset-0 min-h-[130px] !rounded-none" />
            )}
          </div>
        </Link>
      </div>
      <div className="ml-2 w-full">
        <div className="flex mb-2 items-center justify-end">
          {!isLoading ? (
            <>
              {categoryName && <NewsBadge small={true} text={categoryName} />}
            </>
          ) : (
            <Skeleton width={60} height={20} />
          )}
        </div>
        <h3>
          <Link href={data?.uri + queries || '#'}>
            <a className="block text-[#111111] text-xl sm:text-[28px] leading-5 sm:leading-7 font-bold">
              {!isLoading ? (
                <span className={`${theme === 'light' ? 'text-[#222]' : 'text-[#efefef]'}  hover:underline`} style={{ textDecorationColor: '#ce061e' }}>{truncateString(data?.title, 35)}</span>
              ) : (
                <Skeleton />
              )}
            </a>
          </Link>
        </h3>
        <p className={`${theme === 'light' ? 'text-[#555555]' : 'text-[#efefef]'} xsm:hidden md:flex lg:hidden 3xl:flex text-[13px]  font-exo-nav font-medium flex-1 leading-4 mt-2`}>
          {!isLoading ? <div>{postPreview}</div> : <Skeleton count={3} />}
        </p>

      </div>
    </article>
  );
}

export default ResultList;
