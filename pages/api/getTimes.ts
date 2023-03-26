// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/dbConnect'
import times from '../../utils/models/times';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hello");
  await dbConnect();
  console.log("hello2");
  if(req.method == "GET") {
    try {
      const usersTimes = await times.find({});
      console.log(usersTimes);
      res.status(200).json({ success: true, users: usersTimes })
    } catch (e) {
      res.status(200).json({ success: false })
    }
  }
}
