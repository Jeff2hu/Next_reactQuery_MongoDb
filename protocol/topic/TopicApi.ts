import { alertSlice } from '@/redux/alert/alertSlice';
import { store } from '@/redux/store';
import { QueryOptions, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { TopicKey } from './TopicKey';
import { TopicProtocol } from './TopicProtocol';

export class TopicApi {
  // public static async getTopics() {
  //     try {
  //       const response: AxiosResponse<ApiResponse<TopicData[]>> = await axios.get(TopicProtocol.topic);
  //       const { code, message, data }: ApiResponse<TopicData[]> = response.data;
  //       if (code === 200 && Array.isArray(data)) return data;
  //       else throw new Error(message);
  //     } catch (error) {
  //       console.error('Error fetching getTopics:', error);
  //       throw error;
  //     }
  //   }

  public static getTopics(params: GetTopicsParams, options?: QueryOptions) {
    const result: UseQueryResult<TopicResponse, unknown> = useQuery(
      TopicKey.TOPIC_LIST(params.page, params.authorId),
      async (): Promise<TopicResponse | undefined> => {
        const response: AxiosResponse<ApiResponse<TopicResponse>> = await axios.get(TopicProtocol.TOPIC, { params });
        const { code, message, data }: ApiResponse<TopicResponse> = response.data;
        if (code === 200 && data) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      {
        keepPreviousData: true,
        ...options,
      },
    );
    return result;
  }

  public static getTopicBySearch(
    params: TopicSearchParams,
    onSuccess: (_data: TopicData) => void,
    options?: QueryOptions,
  ) {
    const result: UseQueryResult<TopicData, unknown> = useQuery(
      TopicKey.TOPIC(params.id),
      async (): Promise<TopicData | undefined> => {
        const response: AxiosResponse<ApiResponse<TopicData>> = await axios.get(TopicProtocol.TOPIC, { params });
        const { code, message, data }: ApiResponse<TopicData> = response.data;
        if (code === 200 && !Array.isArray(data) && data) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      {
        onSuccess,
        ...options,
      },
    );
    return result;
  }

  public static postNewTopic(onSuccess?: (_data: TopicData | undefined) => void, onError?: (_err: unknown) => void) {
    return useMutation(
      async (require: TopicRequest) => {
        const response: AxiosResponse<ApiResponse<TopicData>> = await axios.post(TopicProtocol.TOPIC, require);
        const { code, data, message }: ApiResponse<TopicData> = response.data;
        if (code === 200 && !Array.isArray(data) && data) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      {
        onSuccess,
        onError,
      },
    );
  }

  public static deleteTopic(onSuccess?: () => void, onError?: (_err: unknown) => void) {
    return useMutation(
      async (params: TopicSearchParams) => {
        const response: AxiosResponse<ApiResponse<TopicData>> = await axios.delete(TopicProtocol.TOPIC, { params });
        const { code, data, message }: ApiResponse<TopicData> = response.data;
        if (code === 200 && !Array.isArray(data) && data) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      {
        onSuccess,
        onError,
      },
    );
  }

  public static editTopic(onSuccess?: (_data: TopicData | undefined) => void, onError?: (_err: unknown) => void) {
    return useMutation(
      async (require: TopicRequest) => {
        const response: AxiosResponse<ApiResponse<TopicData>> = await axios.put(TopicProtocol.TOPIC, require);
        const { code, data, message }: ApiResponse<TopicData> = response.data;
        if (code === 200 && !Array.isArray(data) && data) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      {
        onSuccess,
        onError,
      },
    );
  }
}
