import { useState } from "react";
import { Tab } from "@headlessui/react";
import { HeartIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { getProduct, getRunningQueriesThunk } from "@/services/api";
import { wrapper } from "@/store";
import { Data } from "../api/product/[_id]";
import { urlFor } from "@/utils/client";
import { formatCurrency } from "@/hooks/useFormatCurrency";
import { IProduct, Image as ImageProp } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/user";

const ProductDetail = ({ product }: { product: IProduct }) => {
    const router = useRouter();
    const dispatch = useAppDispatch()

    function classNames(...classes: string[]): string {
        return classes.filter(Boolean).join(" ");
    }

    // add to cart 
    function addProductToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // dispatch action
        dispatch(addToCart(product))
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Image gallery */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-6">
                                    {product.images?.map((image: ImageProp) => (
                                        <Tab key={image._key} className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                                            {({ selected }) => (
                                                <>
                                                    <span className="sr-only"> {product.name} </span>
                                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                                        <Image src={urlFor(image.asset._ref).size(700, 700).url()} width="700" height="300" alt={image.alt.current} className="h-full w-full object-contain  sm:rounded-lg" />
                                                        {/* <img src={urlFor(image.asset._ref).size(700, 700).url()} alt={image.alt.current} className="h-full w-full object-cover" /> */}
                                                    </span>
                                                    <span className={classNames(selected ? "ring-indigo-500" : "ring-transparent", "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2")} aria-hidden="true" />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>

                            <Tab.Panels className="min-h-[40rem] w-full">
                                {product.images?.map((image: ImageProp) => (
                                    <Tab.Panel key={image._key}>
                                        <Image src={urlFor(image.asset._ref).size(500, 500).url()} width="500" height="500" alt={image.alt.current} className="h-full w-full object-contain sm:rounded-lg" />
                                        {/* <img src={urlFor(image.asset._ref).size(400, 400).url()} alt={image.alt.current} className="h-full w-full object-contain sm:rounded-lg" /> */}
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{formatCurrency(product.price)}</p>
                            </div>

                            {/* Reviews */}
                            {/* <div className="mt-3">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon key={rating} className={classNames(product.rating > rating ? "text-indigo-500" : "text-gray-300", "h-5 w-5 flex-shrink-0")} aria-hidden="true" />
                                        ))}
                                    </div>
                                    <p className="sr-only">{product.rating} out of 5 stars</p>
                                </div>
                            </div> */}

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6 text-base text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>

                            <form className="mt-6">
                                <div className="sm:flex-col1 mt-10 flex">
                                    <button
                                        type="submit" disabled={product.stocks == 0 || !product.available}
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => addProductToCart(e)}
                                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full disabled:bg-gray-500 disabled:text-gray-800">
                                        Add to bag
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    const id = params?._id;

    let response: any;
    if (typeof id === "string") {
        response = await store.dispatch(getProduct.initiate(id));

        await Promise.all(store.dispatch(getRunningQueriesThunk()));
    }
    const product = response.data as unknown as Data;

    return {
        props: {
            product: product.data,
        },
    };
});

export default ProductDetail;
