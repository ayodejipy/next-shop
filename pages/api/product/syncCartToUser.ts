// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/utils/client";
import { productQuery } from "@/queries/product";
import type { ICartProduct } from "@/types/product";

export type Data = {
    message: string;
    success: boolean;
    data?: ICartProduct;
};

export default async function syncCartToUserHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method == "POST") {
        const cartDoc = req.body;
		try {
			// sanity client takes over, create a new cart document if it doesn't exist
			const response = await client.createIfNotExists(cartDoc)
			res.status(200).json({ success: true, message: "Cart synced to user successfully" })
				
		} catch (error: any) {
			console.log({ error })
			res.status(400).json({ success: false, message: "Cannot sync cart to users at the moment" })
		}
    }
}