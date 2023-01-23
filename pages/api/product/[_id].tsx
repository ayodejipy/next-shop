// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/utils/client";
import { getProduct } from "@/queries/product";
import type { IProduct } from "@/types/product";

export type Data = {
    message: string;
    success: boolean;
    data?: IProduct;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { _id } = req.query;
        // fetch product with id
        const response = await client.fetch(getProduct, { productId: _id });
        res.status(200).json({ success: true, message: "Product fetched successfully", data: response });
    } catch (error) {
        res.status(400).json({ success: false, message: "Unable to fetch product" });
    }
}
