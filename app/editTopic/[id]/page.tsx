import EditTopicForm from '@/components/client/EditTopicForm';
import { memo } from 'react';

const editTopic = ({ params }:any) => {
  const { id } = params;

  return (
    <EditTopicForm id={id}/>
  )
}

export default memo(editTopic)