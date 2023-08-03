import { alertSlice } from '@/redux/alert/alertSlice';
import { store } from '@/redux/store';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
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

  public static async getTopicBySearch(params: TopicSearchParams) {
    try {
      const response: AxiosResponse<ApiResponse<TopicData>> = await axios.get(TopicProtocol.TOPIC, { params });
      const { code, message, data }: ApiResponse<TopicData> = response.data;
      if (code === 200 && !Array.isArray(data) && data) return data;
      else throw new Error(message);
    } catch (error) {
      console.error('Error fetching getTopicBySearch:', error);
      throw error;
    }
  }

  public static async postNewTopic(require: TopicRequest) {
    try {
      const response: AxiosResponse<ApiResponse<TopicData>> = await axios.post(TopicProtocol.TOPIC, require);
      const { code, message, data }: ApiResponse<TopicData> = response.data;
      if (code === 200 && !Array.isArray(data) && data) return data;
      else throw new Error(message);
    } catch (error) {
      console.error('Error fetching postNewTopic:', error);
      throw error;
    }
  }

  public static async deleteTopic(params: TopicSearchParams) {
    try {
      const response: AxiosResponse<ApiResponse<TopicData>> = await axios.delete(TopicProtocol.TOPIC, { params });
      const { code, message, data }: ApiResponse<TopicData> = response.data;
      if (code === 200 && !Array.isArray(data) && data) return data;
      else throw new Error(message);
    } catch (error) {
      console.error('Error fetching postNewTopic:', error);
      throw error;
    }
  }

  public static async editTopic(require: TopicRequest) {
    try {
      const response: AxiosResponse<ApiResponse<TopicData>> = await axios.put(TopicProtocol.TOPIC, require);
      const { code, message, data }: ApiResponse<TopicData> = response.data;
      if (code === 200 && !Array.isArray(data) && data) return data;
      else throw new Error(message);
    } catch (error) {
      console.error('Error fetching postNewTopic:', error);
      throw error;
    }
  }

  public static getTopics(params: GetTopicsParams, options?: QueryOptions) {
    const result = useQuery(
      ['topicList', params.page],
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
        select: (data) => data as TopicResponse,
        keepPreviousData: true,
        ...options,
      },
    );
    return result;
  }
}
