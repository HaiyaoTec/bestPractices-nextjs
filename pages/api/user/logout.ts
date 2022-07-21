import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import {sessionOptions} from "@/lib/authentication/session";
import {User} from "@/lib/example/Dto";

export default withIronSessionApiRoute(handler, sessionOptions)

function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  res.json({ isLoggedIn: false,userName:'Guest'})
}
