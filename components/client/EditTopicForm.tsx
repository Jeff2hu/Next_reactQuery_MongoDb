'use client';

import { TopicApi } from '@/protocol/topic/TopicApi';
import { TopicKey } from '@/protocol/topic/TopicKey';
import { useAlert } from '@/redux/alert/alertActions';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, memo, useCallback, useState } from 'react';
import Button from './Button';
import Input from './Input';

interface Props {
  id: string;
  page: string;
}

const EditTopicForm = ({ id, page }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAlert } = useAlert();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const editHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      editMutation.mutate({ title, description, id });
    },
    [title, description, id],
  );

  const { data: TopicData, ...TopicStatus } = TopicApi.getTopicBySearch(
    { id },
    (data) => {
      setTitle(data.title);
      setDescription(data.description);
    },
    {
      initialData: () => {
        const _data = (queryClient.getQueryData(TopicKey.TOPIC_LIST(Number(page), '')) as TopicResponse)?.data?.find(
          (item) => item.id === id,
        );
        console.log('KEY', TopicKey.TOPIC_LIST(Number(page), ''));
        console.log('initialData', _data);
        if (_data) {
          return {
            data: _data,
          };
        } else {
          return undefined;
        }
      },
    },
  );

  const editMutation = TopicApi.editTopic(
    () => {
      router.push('/');
      queryClient.invalidateQueries(TopicKey.TOPIC_LIST(1, ''));
    },
    (err) => {
      console.log('useMutation err', err);
      setAlert({ title: 'Add Topic Error', text: typeof err === 'string' ? err : 'Add Topic Error', open: true });
    },
  );

  return (
    <div>
      {TopicStatus.isLoading ? (
        <div className="text-black text-center font-bold">Loading...</div>
      ) : TopicStatus.isError ? (
        <div className="text-black text-center font-bold">Error</div>
      ) : (
        <div className="grid place-items-center min-h-[40vh]">
          <form className="flex flex-col gap-3 items-center" onSubmit={editHandler}>
            <Input value={title} onChange={setTitle} placeHolder="title..." />
            <Input value={description} onChange={setDescription} placeHolder="Description..." />
            <Button text="Updated Topic" />
          </form>
        </div>
      )}
    </div>
  );
};

export default memo(EditTopicForm);
