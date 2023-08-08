'use client';

import PageNation from '@/components/client/PageNation';
import Select from '@/components/client/Select';
import TopicList from '@/components/client/TopicList';
import { AuthorApi } from '@/protocol/author/AuthorApi';
import { TopicApi } from '@/protocol/topic/TopicApi';
import { QueryOptions } from '@tanstack/react-query';
import { useState } from 'react';

export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState<number>(0);
  const [selected2, setSelected2] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const { data: authorData, ...authorStatus } = AuthorApi.getAuthors({ refetchOnMount: false } as QueryOptions);
  const { data: topicData, ...topicStatus } = TopicApi.getTopics({
    page: page,
    pageSize: 5,
  });

  return (
    <div className="flex flex-col gap-2">
      {authorStatus.isLoading || topicStatus.isLoading ? (
        <div className="flex flex-row justify-center items-center gap-3">
          <div
            className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent "
            role="status"
          ></div>
          <p>Loading...</p>
        </div>
      ) : authorStatus.isError || topicStatus.isError ? (
        <div>Error</div>
      ) : (
        <div className="flex flex-col gap-2">
          {authorData && (
            <div className="flex flex-row gap-3 items-end h-full w-[200px]">
              <Select
                options={authorData}
                value={selectedAuthor.toString()}
                onChange={(_value: string) => setSelectedAuthor(Number(_value))}
                placeholder="placeholder..."
              />
            </div>
          )}
          {topicData && topicData.data?.map((item) => <TopicList data={item} key={item.id} />)}
        </div>
      )}
      {topicData && (
        <div className="self-center">
          <PageNation maxPage={topicData.maxPage} setPage={setPage} page={page} />
        </div>
      )}
    </div>
  );
}
