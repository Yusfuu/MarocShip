import React from "react";
import { useMutation } from "hooks/useMutation";
// import { useQuery } from "hooks/useQuery";

export const Home = () => {
    // const [result] = useQuery('stats', "dsadasd");
    // console.log(result);
    const { mutate: driver }: any = useMutation("/admin/create", {
        onSuccess: (res: any) => console.log(res.data),
        onError: (err: any) => console.log(err),
    });

    const handlClick = () => {
        driver({
            email: "Lindsad80@hotmail.com",
            name: "Duane Klein",
        });
    };
    return (
        <>
            <h1 className="bg-red-300">hello home page</h1>
            <button onClick={handlClick}>create driver</button>
        </>
    );
};
