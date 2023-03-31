import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'


export default async function handler(req : NextApiRequest, res: NextApiResponse)  {
  const token = await getToken({ req, raw: true })

  return res.status(200).json({token})
  // This is horrible practice, update this before deployment
  // TODO: Test this works when there's a functioning backend
  
  await fetch("/backend/checkout/noPayment", {
    method: "POST",
    body: JSON.stringify({
      name: req.body.name,
      position: req.body.position,
      league: req.body.league
    }),
    headers: {
      "content-type": "application/json",
      "Bearer": token
    },
  })
  .then(((res) => {
    console.log(res.status)
    console.log(res)
  }))
  .catch((e) => {
    console.log(e)
  });
}