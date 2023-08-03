'use client';

import { TopicApi } from '@/protocol/TopicApi';
import { useAlert } from '@/redux/alert/alertActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FormEvent, memo, useCallback, useState } from 'react';
import Button from './Button';
import Input from './Input';

interface Props {
  id: string;
}

const EditTopicForm = ({ id }: Props) => {
  const router = useRouter();
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const editHandler = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      return TopicApi.editTopic({ title, description, id });
    },
    [title, description, id],
  );

  const { isLoading, isError } = useQuery({
    queryKey: ['topic', id],
    queryFn: () => TopicApi.getTopicBySearch({ id }),
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
    },
  });

  const editMutation = useMutation({
    mutationFn: editHandler,
    onSuccess: () => {
      router.push('/');
      queryClient.invalidateQueries(['topicList']);
    },
    onError: (err) => {
      console.log('useMutation err', err);
      setAlert({ title: 'Add Topic Error', text: typeof err === 'string' ? err : 'Add Topic Error', open: true });
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="text-black text-center font-bold">Loading...</div>
      ) : isError ? (
        <div className="text-black text-center font-bold">Error</div>
      ) : (
        <div className="grid place-items-center min-h-[40vh]">
          <form
            className="flex flex-col gap-3 items-center"
            onSubmit={(e: FormEvent<HTMLFormElement>) => editMutation.mutate(e)}
          >
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
