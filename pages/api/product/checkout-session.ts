// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';
import type { ICartProduct } from "@/types/product";
// type Data = {
//     message: string;
// 	success: boolean;
// };

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
		const carts: ICartProduct[] = req.body.cart;

		const items = carts.map((cart: ICartProduct) => {
            const img = cart.item.images[0].asset._ref;
            const image_string = img.replace("image-", "https://cdn.sanity.io/images/5pxcf7bw/production/").replace("webp-", ".webp");

            const stripe_Object = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cart.item.name,
                        images: [image_string],
                    },
                    unit_amount: cart.item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                },
                quantity: cart.quantity,
            };

            //  return the object
            return stripe_Object;
        });
		
		try {
			// params object
			const params: Stripe.Checkout.SessionCreateParams = {
				line_items: items,
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/?cancelled=true&session_id={CHECKOUT_SESSION_ID}`,
			}

			const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

			res.status(200).json(checkoutSession);
				
		} catch (error: any) {
			res.status(500).json({ success: false, message: error.message })
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed')
	}
}
