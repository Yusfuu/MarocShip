import { useMutation as Mutation, UseMutationOptions } from "react-query";
import { Axios } from "utils/Axios";

export const useMutation = (url: string, sideEffects: UseMutationOptions) => {
    return Mutation(
        (body: any) => Axios.post(url, body).catch((err) => err.response),
        sideEffects
    );
};
