import axios from "axios";
import { Session } from "next-auth";
import { LoginInput } from "../../../types/types";

/**
 * Function for posting the form to the server to generate the report
 * 
 * @param form Form containing the required info to generate the report
 * @param session USer session
 * @returns Response object
 */
export const generateReport = async (form: FormData, session: Session, hasOrderId: boolean) => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/fulfillOrder`

    if (!hasOrderId)
        url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/noPayment`

    return await axios({
        method: "POST",
        url,
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        },
        data: form,
    });
}

interface FormValues {
    playerName: string;
}

/**
 * Method for purchasing a report
 * 
 * @param form Form containing the required info
 * @param session User session
 * @returns Response object
 */
export const purchaseReport = async (form: FormValues, session: Session) => {
    return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/pay`,
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
        data: form
    })
}

/**
 * Method for registering a new account
 * 
 * @param values 
 * @returns 
 */
export const register = async (values: LoginInput) => {
    return await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        method: "POST",
        data: values
    })
}