'use client';

import { AuthorApi } from '@/protocol/author/AuthorApi';
import { DifferenceApi } from '@/protocol/difference/DifferenceApi';
import { QueryOptions } from '@tanstack/react-query';
import { memo, useState } from 'react';

const Difference = () => {
  const [selectedFirstAuthor, setSelectedFirstAuthor] = useState<string>('');
  const [selectedSecondAuthor, setSelectedSecondAuthor] = useState<string>('');
  const { data: authorData, ...authorStatus } = AuthorApi.getAuthors({ refetchOnWindowFocus: false } as QueryOptions);
  const { data: houseData, ...houseStatus } = DifferenceApi.getHouses(
    {
      firstAuthorId: selectedFirstAuthor,
      secondAuthorId: selectedSecondAuthor,
    },
    {
      enabled: !!selectedFirstAuthor && !!selectedSecondAuthor,
    } as QueryOptions,
  );

  return (
    <div>
      <div className="flex flex-row gap-3">
        <select
          id="firstAuthor"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSelectedFirstAuthor(e.target.value)}
        >
          <option selected>Please Select - - -</option>
          {authorData &&
            authorData
              .filter((item) => item.value !== selectedSecondAuthor)
              .map((item) => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              ))}
        </select>
        <select
          id="secondAuthor"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setSelectedSecondAuthor(e.target.value)}
          disabled={!selectedFirstAuthor}
        >
          <option selected>Please Select - - -</option>
          {authorData &&
            authorData
              .filter((item) => item.value !== selectedFirstAuthor)
              .map((item) => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              ))}
        </select>
      </div>
      {houseData && (
        <div className="flex flex-row gap-2 bg-white p-5 my-3 rounded-2xl">
          <div className="flex-1 flex flex-row gap-3 justify-center border-b-2">
            <p>First Author:</p>
            <p>{houseData.firstAuthor[0]?.name}</p>
          </div>
          <div className="flex-1 flex flex-row gap-3 justify-center border-b-2">
            <p>Second Author:</p>
            <p>{houseData.secondAuthor[0]?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Difference);
