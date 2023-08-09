import { alertSlice } from '@/redux/alert/alertSlice';
import { store } from '@/redux/store';
import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

export class DifferenceApi {
  public static readonly PROTOCOL_HOUSE: string = 'http://localhost:3000/api/house';

  public static KEY_HOUSE(firstAuthorId: string, secondAuthorId: string) {
    return ['house', firstAuthorId, secondAuthorId];
  }

  public static getHouses(params: HouseParams, options?: QueryOptions) {
    const result: UseQueryResult<HouseData | undefined, unknown> = useQuery(
      this.KEY_HOUSE(params.firstAuthorId, params.secondAuthorId),
      async (): Promise<HouseData | undefined> => {
        const response: AxiosResponse<ApiResponse<HouseData>> = await axios.get(this.PROTOCOL_HOUSE, { params });
        const { code, data, message }: ApiResponse<HouseData> = response.data;
        if (code === 200 && !Array.isArray(data) && data) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      options,
    );
    return result;
  }
}
