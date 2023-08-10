import EditTopicForm from '@/components/client/EditTopicForm';
import { memo } from 'react';

const editTopic = ({ params }: any) => {
  const { id, page } = params;

  return <EditTopicForm id={id} page={page} />;
};

export default memo(editTopic);
