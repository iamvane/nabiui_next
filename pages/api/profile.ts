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
  const token = jwt.sign({"user_id": req.query.user_id}, "secret");
  res.status(200).json({ token });
}
