import { Dropdown, DropdownT } from '@/components/client/Select';
import { QueryOptions, useQuery } from '@tanstack/react-query';

export class Select1Api {
    public static getSelect1(options?: QueryOptions){
        const result = useQuery(
            ['select1List'],
            async ():Promise<DropdownT<number>[]> => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve([
                            {
                                value: 1,
                                text: 'Topic 1'
                            },
                            {
                                value: 2,
                                text: 'Topic 2'
                            },
                            {
                                value: 3,
                                text: 'Topic 3'
                            },
                        ])
                    }, 1000)
                })
            },
            {
                select: (data: DropdownT<number>[]) => data.map((item) => ({ value: item.value.toString(), text: item.text })) as Dropdown[],
                ...(options && { options })
            }
        );
        return result;
        }
}