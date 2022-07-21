import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/authentication/session'
import { NextApiRequest, NextApiResponse } from 'next'
import {ErrorMessage, User} from "@/lib/example/Dto";

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req: NextApiRequest, res: NextApiResponse<User|ErrorMessage>) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: `Method ${req.method} not allowed` })
    return
  }
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      userName:'Guest',
      isLoggedIn: false,
    })
  }
}
