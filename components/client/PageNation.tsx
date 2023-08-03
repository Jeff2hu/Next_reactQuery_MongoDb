'use client';

import { memo } from 'react';

interface PageProps {
  maxPage: number;
  page: number;
  setPage: (page: number) => void;
}

const PageNation = ({ maxPage, setPage, page }: PageProps) => {
  return (
    <div aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
            }`}
          >
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: maxPage }, (_, i) => i + 1).map((item) => (
          <li>
            <button
              onClick={() => setPage(item)}
              className={`z-index-10 flex items-center justify-center px-3 h-8 leading-tight font-bold
               text-gray-500 bg-white border border-gray-300
                 hover:bg-gray-100 hover:text-gray-700
                 ${page === item ? 'text-sky-500' : ''}`}
            >
              {item}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === maxPage}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              page === maxPage ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
            }`}
          >
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http:www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default memo(PageNation);
