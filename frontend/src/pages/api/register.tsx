import { LoginInput } from "../../../types/types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") {
    res.status(404)
  }

  console.log("in backend!")

  try {
    const { data, status } = await axios.post<LoginInput>(
      `${process.env.BACKEND_URL}/auth/register`,
      req.body
    )
    console.log(status)
    res.status(status)
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e)
      res.status(500)
    } else {
      console.log(e)
      res.status(500)
    }
  }
  
}


async function Register(values: LoginInput) {
  return await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: values.email, 
      password: values.password
    }),
    headers: {
      "content-type": "application/json",
    },
  })
}