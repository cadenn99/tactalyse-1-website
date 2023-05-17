import { AxiosResponse } from "axios";

interface Props {
    response: AxiosResponse
    changeError: React.Dispatch<any>
}
export const errorHandler = ({ response, changeError }: Props) => {
    return new Promise((resolve) => {
        changeError({
            error: response.status === 200 ? false : true,
            message: response.data?.message ?? "Success, you will be redirected in a moment",
        });

        setTimeout(() => {
            changeError({
                error: false,
                message: "",
            });
            resolve({})
        }, 3000);
    })
}