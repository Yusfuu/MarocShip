import { useQuery as Query, QueryKey, UseQueryOptions } from "react-query";
import { Axios } from "utils/Axios";

export const useQuery = (key: QueryKey, url: string, options: UseQueryOptions = {}) => {
    return Query(key, async () => {
        const { data } = await Axios.get(url).catch(_ => _);
        return data;
    }, options);
};
