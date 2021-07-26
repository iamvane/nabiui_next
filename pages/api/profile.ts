// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type Token = {
  token: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token>
) {
  const token = jwt.sign({"user_id": req.query.user_id}, "bjtrgruqzb8b94gz54pnrr423k6ngrxquttdw6u52bkpf2ka473qqku2qy65mmy7");
  res.status(200).json({ token });
}
