import { AxiosResponse } from "axios";

interface Props {
    response: AxiosResponse
    changeError: React.Dispatch<any>
}
export const errorHandler = ({ response, changeError }: Props) => {
    changeError({
        error: response.status === 200 ? false : true,
        message: response.data?.message ?? "Success",
    });

    setTimeout(() => {
        changeError({
            error: false,
            message: "",
        });
    }, 5000);
}