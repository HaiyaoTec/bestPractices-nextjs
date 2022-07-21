import {withIronSessionApiRoute} from 'iron-session/next'
import {NextApiRequest, NextApiResponse} from 'next'
import {sessionOptions} from "@/lib/authentication/session";
import {User} from "@/lib/example/Dto";

export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body
  const {email} = JSON.parse(body)
  switch (req.method) {
    case 'POST': {
      try {
        const user = {isLoggedIn: true,userName:email} as User
        req.session.user = user
        await req.session.save()
        res.json(user)
      } catch (error) {
        res.status(500).json({message: (error as Error).message})
      }
    } break;
    default:
      res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}
