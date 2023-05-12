import axios from "axios";

interface Args {
    url: string;
    authorization?: string;
}

export const fetcher = (args: Args) =>
    axios(args.url, { headers: { Authorization: args.authorization } }).then(
        (res) => res.data
    );