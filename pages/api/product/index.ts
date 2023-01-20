// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/utils/client";
import { productQuery } from "@/queries/product";
import type { IProduct } from "@/types/product";

export type Data = {
    message: string;
    success: boolean;
    data?: IProduct[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
        try {
            // fetch lists of products from sanity
            const response = await client.fetch(productQuery);
            res.status(200).json({ success: true, message: "Products fetched successfully", data: response });
        } catch (error) {
            res.status(400).json({ success: false, message: "Unable to fetch products" });
        }
}
