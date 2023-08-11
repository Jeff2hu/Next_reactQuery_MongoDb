import { Dropdown } from '@/components/client/Select';
import { alertSlice } from '@/redux/alert/alertSlice';
import { store } from '@/redux/store';
import { QueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { AuthorKey } from './AuthorKey';
import { AuthorProtocol } from './AuthorProtocol';

export class AuthorApi {
  public static getAuthors(options?: QueryOptions) {
    const result: UseQueryResult<Dropdown[] | undefined, unknown> = useQuery(
      AuthorKey.AUTHOR_LIST(),
      async (): Promise<AuthorData[] | undefined> => {
        const response: AxiosResponse<ApiResponse<AuthorData[]>> = await axios.get(AuthorProtocol.AUTHOR_LIST);
        const { code, data, message }: ApiResponse<AuthorData[]> = response.data;
        if (code === 200 && Array.isArray(data)) return data;
        else {
          store.dispatch(alertSlice.actions.setAlert({ open: true, title: 'Error Message!', text: message }));
          return undefined;
        }
      },
      {
        select: (data: unknown) => {
          if (!data) return undefined;
          else
            return (data as AuthorData[]).reduce<Dropdown[]>(
              (acc: any, cur: AuthorData) => [...acc, { text: cur.name, value: cur.id }],
              [] as Dropdown[],
            );
        },
        ...options,
      },
    );
    return result;
  }
}
