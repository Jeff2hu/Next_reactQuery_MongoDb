'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/component/ui/card';
import { TopicApi } from '@/protocol/TopicApi';
import { useAlert } from '@/redux/alert/alertActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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

  const deleteMutation = useMutation({
    mutationFn: () => TopicApi.deleteTopic({ id: data.id }),
    onSuccess: () => {
      quertClient.invalidateQueries(['topicList']);
    },
  });

  const deleteHandler = useCallback(() => {
    setAlert({
      open: true,
      text: 'Would you like to delete this topic?',
      title: 'Waring',
      ok: () => deleteMutation.mutate(),
    });
  }, []);

  return (
    <Card className="w-full">
      <CardHeader
        className={`${collapsible ? '' : 'pb-0 pt-8'} flex flex-row justify-between items-end transition-all`}
      >
        <CardTitle>{data.title}</CardTitle>
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
