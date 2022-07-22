import { NextApiRequest, NextApiResponse } from 'next'
import {User} from "@/lib/example/Dto";

export default function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  res.json({ isLoggedIn: false,userName:'Guest'})
}
