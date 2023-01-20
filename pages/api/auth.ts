// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/utils/client";
import type { User } from "@/types/user";

type Data = {
    message: string;
	success: boolean;
	data?: any
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method == "POST") {
        const user = req.body;
		try {
			// sanity client takes over, create a new user document if it doesn't exist
			const response = await client.createIfNotExists(user)
			res.status(200).json({ success: true, message: "User logged in successfully", data: response })
			// redirect user to homepage
			res.redirect('/');
				
		} catch (error) {
			res.status(400).json({ success: false, message: "Unable to log user in", data: error })
		}
    }
}
