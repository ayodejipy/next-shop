import { Fragment, useState } from "react";
import Stripe from "stripe";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ICartProduct } from "@/types/product";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { urlFor } from "@/utils/client";
import { formatCurrency } from "@/hooks/useFormatCurrency";
import { removeItem, increaseItem, decreaseItem } from "@/store/user";
import { fetchPostJSON } from "@/utils/api-helper";
import getStripe from "@/utils/get-stripejs";

interface IProps {
    open: boolean;
    toggle: (arg: boolean) => void;
}

function CartItems({ open, toggle }: IProps) {
    const dispatch = useAppDispatch();

    // STATE
    const [isLoading, setIsLoading] = useState(false);
    const cart = useAppSelector((store) => store.user.cart);

    // METHODS
    const getTotal: number = cart.reduce((acc: number, prev: ICartProduct) => (acc += prev.quantity * prev.item.price), 0);

    const handleCheckout = async () => {
        setIsLoading(true);
        // create checkout session
        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON("/api/product/checkout-session", { cart });

        if ((checkoutSession as any).statusCode === 500) {
            setIsLoading(false);
            console.error((checkoutSession as any).message);
            return;
        }

        // redirect to checkout
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: checkoutSession.id,
        });

        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        if (error) {
            setIsLoading(false);
            console.log(error);
            console.warn(error.message);
        }
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => toggle(false)}>
                    <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button data-testid="close" type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => toggle(false)}>
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        {cart.length > 0 ? (
                                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                {cart.map((product: ICartProduct) => (
                                                                    <li data-testid="cart-product" key={product.item._id} className="flex py-6">
                                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                            <img data-testid="product-image" src={urlFor(product.item.images[0].asset._ref).url()}
                                                                                alt={product.item.images[0].alt.current}
                                                                                className="h-full w-full object-cover object-center"
                                                                            />

                                                                            {/* <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" /> */}
                                                                        </div>

                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3 data-testid="name">{product.item.name}</h3>
                                                                                    <p data-testid="price" className="ml-4">
                                                                                        {formatCurrency(product.item.price)}
                                                                                    </p>
                                                                                </div>
                                                                                <p data-testid="color" className="mt-1 text-sm text-gray-500">
                                                                                    {product.item.color}
                                                                                </p>
                                                                            </div>
                                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                                <div>
                                                                                    <div className="border border-gray-50 flex items-center gap-2 mt-2">
                                                                                        <button data-testid="decrease-qnt" type="button" onClick={() => dispatch(decreaseItem(product))} className="border-none bg-gray-200 px-2.5 py-1.5">
                                                                                            -
                                                                                        </button>
                                                                                        <div data-testid="quantity" id="product-quantity" className="inline-block text-center px-0.5">
                                                                                            {product.quantity}
                                                                                        </div>
                                                                                        <button data-testid="increase-qnt" type="button" onClick={() => dispatch(increaseItem(product))} className="border-none bg-gray-200 px-2.5 py-1.5">
                                                                                            +
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                                                                <div className="flex">
                                                                                    <button data-testid="remove-product" type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => dispatch(removeItem(product))}>
                                                                                        Remove
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <div data-testid="empty-cart" className="flex justify-center text-base font-medium text-gray-900">
                                                                <p> Cart is currently empty </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                {cart.length > 0 ? (
                                                    <>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <p>Subtotal</p>
                                                            <p data-testid="subtotal">{formatCurrency(getTotal)}</p>
                                                        </div>
                                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                        <div className="mt-6">
                                                            <button type="button" onClick={handleCheckout} disabled={cart.length === 0} className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed">
                                                                {isLoading ? "Loading" : "Checkout"}
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}

                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        <button type="button" className="ml-1 first-letter:font-medium text-indigo-600 hover:text-indigo-500" onClick={() => toggle(false)}>
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default CartItems;
