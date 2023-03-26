// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/dbConnect'
import times from '../../utils/models/times';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if(req.method == "POST") {
    try {
      const data = JSON.parse(req.body);
      console.log(data);
      const track = await times.create({name: data.name, starttime: data.startedTime, endtime: data.endedTime, comments: data.comments});
      console.log("worked");
      console.log(track);
      res.status(201).json({ success: true })
    } catch (e) {
      res.status(201).json({ success: false })
    }
  }
}
