'use client';

import AlertDialogDemo from '@/components/client/Alert';
import PageNation from '@/components/client/PageNation';
import Select from '@/components/client/Select';
import TopicList from '@/components/client/TopicList';
import { Select1Api } from '@/protocol/Select1Api';
import { TopicApi } from '@/protocol/TopicApi';
import { QueryOptions } from '@tanstack/react-query';
import { useState } from 'react';

export default function Home() {
  const [selected1, setSelected1] = useState<number>(0);
  const [selected2, setSelected2] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const { data: Select1Data, ...Select1Status } = Select1Api.getSelect1({ refetchOnMount: false } as QueryOptions);
  const { data: TopicData, ...TopicStatus } = TopicApi.getTopics({
    page: page,
    pageSize: 5,
  });
  return (
    <div className="flex flex-col gap-2">
      {Select1Status.isLoading || TopicStatus.isLoading ? (
        <div className="flex flex-row justify-center items-center gap-3">
          <div
            className="h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent "
            role="status"
          ></div>
          <p>Loading...</p>
        </div>
      ) : Select1Status.isError || TopicStatus.isError ? (
        <div>Error</div>
      ) : (
        <div className="flex flex-col gap-2">
          {Select1Data && (
            <div className="flex flex-row gap-3 items-end h-full w-[200px]">
              <Select
                options={Select1Data}
                value={selected1.toString()}
                onChange={(_value: string) => setSelected1(Number(_value))}
                placeholder="placeholder..."
              />
            </div>
          )}
          {TopicData && TopicData.data?.map((item) => <TopicList data={item} key={item.id} />)}
        </div>
      )}
      {TopicData && (
        <div className="self-center">
          <PageNation maxPage={TopicData.maxPage} setPage={setPage} page={page} />
        </div>
      )}
      <AlertDialogDemo />
    </div>
  );
}
