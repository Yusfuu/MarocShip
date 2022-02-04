import notfound from "assets/404.gif";

export const NotFound = () => {
    return (

        <div className="w-screen h-screen flex justify-center items-center">
            <img src={notfound} alt="" />
        </div>
    );
};
