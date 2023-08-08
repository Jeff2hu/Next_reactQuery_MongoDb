'use client';

import Button from '@/components/client/Button';
import Input from '@/components/client/Input';
import { TopicApi } from '@/protocol/topic/TopicApi';
import { TopicKey } from '@/protocol/topic/TopicKey';
import { useAlert } from '@/redux/alert/alertActions';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, memo, useCallback, useState } from 'react';

const AddTopic = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setAlert } = useAlert();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const postMutation = TopicApi.postNewTopic(
    (data) => {
      if (!data) return;
      queryClient.setQueryData(TopicKey.TOPIC(data.id), data);
      router.push(`/editTopic/${data.id}`);
    },
    (err) => {
      setAlert({ title: 'Add Topic Error', text: typeof err === 'string' ? err : 'Add Topic Error', open: true });
    },
  );

  const postHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      postMutation.mutate({ title, description });
    },
    [title, description],
  );

  return (
    <div className="grid place-items-center min-h-[40vh]">
      <form className="flex flex-col gap-3 items-center" onSubmit={postHandler}>
        <Input value={title} onChange={setTitle} placeHolder="title..." />
        <Input value={description} onChange={setDescription} placeHolder="Description..." />
        <Button text="Add Topic" />
      </form>
    </div>
  );
};

export default memo(AddTopic);
