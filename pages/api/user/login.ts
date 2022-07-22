import {NextApiRequest, NextApiResponse} from 'next'
import {User} from "@/lib/example/Dto";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body
  const {email} = JSON.parse(body)
  switch (req.method) {
    case 'POST': {
      try {
        const user = {isLoggedIn: true,userName:email} as User
        res.json(user)
      } catch (error) {
        res.status(500).json({message: (error as Error).message})
      }
    } break;
    default:
      res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}
