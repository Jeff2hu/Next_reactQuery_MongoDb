type TopicRequest = {
  id?: string;
  title: string;
  description: string;
};

type TopicResponse = {
  maxPage: number;
  data: TopicData[];
};

type TopicData = {
  title: string;
  description: string;
  id: string;
};

type TopicSearchParams = {
  id: string;
};

type GetTopicsParams = {
  page: number;
  pageSize: number;
};
