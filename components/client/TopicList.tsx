'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/card';
import { TopicApi } from '@/protocol/topic/TopicApi';
import { useAlert } from '@/redux/alert/alertActions';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { HiPencilAlt } from 'react-icons/hi';
import RemoveBtn from './RemoveBtn';

interface Props {
  data: TopicData;
}

export function CardWithForm({ data }: Props) {
  const { setAlert } = useAlert();
  const quertClient = useQueryClient();
  const [collapsible, setCollapsible] = useState<boolean>(false);

  const deleteMutation = TopicApi.deleteTopic(() => quertClient.invalidateQueries(['topicList']));

  const deleteHandler = useCallback(() => {
    setAlert({
      open: true,
      text: 'Would you like to delete this topic?',
      title: 'Waring',
      ok: () => deleteMutation.mutate({ id: data.id }),
    });
  }, []);

  return (
    <Card className="w-full">
      <CardHeader
        className={`${collapsible ? '' : 'pb-0 pt-8'} flex flex-row justify-between items-end transition-all`}
      >
        <div className="flex flex-row gap-3 items-end">
          <CardTitle>{data.title}</CardTitle>
          <CardTitle className="text-sm">{`-${data.author}`}</CardTitle>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row items-center" onClick={deleteHandler}>
            <RemoveBtn />
          </div>
          <Link href={`/editTopic/${data.id}`}>
            <HiPencilAlt size={24} />
          </Link>
          {collapsible ? (
            <AiFillCaretUp onClick={() => setCollapsible(false)} />
          ) : (
            <AiFillCaretDown onClick={() => setCollapsible(true)} />
          )}
        </div>
      </CardHeader>
      <CardContent className={`${collapsible ? 'opacity-100' : 'opacity-0 pt-0'} transition-all`}>
        {data.description}
      </CardContent>
    </Card>
  );
}

export default memo(CardWithForm);
