type TopicRequest = {
    id?: string;
    title: string;
    description: string;
}

type TopicResponse = {
    title: string;
    description: string;
    id: string;
}

type TopicSearchParams = {
    id: string;
}