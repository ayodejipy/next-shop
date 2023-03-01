import { useEffect } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Product from "@/components/product/product";
import { getProducts, getRunningQueriesThunk } from "@/services/api";
import { useAppDispatch } from "@/store/hooks";
import { emptyCart } from "@/store/user";
import { wrapper } from "@/store";
import { toast, ToastContainer } from "react-toastify";
import { toastConfig } from "@/hooks/useToast";
import type { IProduct } from "@/types/product";
import type { Data } from "./api/product";


const Home = ({ products }: { products: IProduct[] }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { success, cancelled } = router.query;

    useEffect(() => {
        // handle order notifcation
        function handleNotifications() {
            if (success !== undefined) {
                dispatch(emptyCart());
                toast.success("Your order has been confirmed, kindly check your email for more instructions.", toastConfig);
            }
            if (cancelled !== undefined) {
                toast.error("😞 Your order has been cancelled!", toastConfig);
            }
        }
        handleNotifications();

        // clean up function for toasts remounting
        return () => toast.dismiss();
    }, [success, cancelled, dispatch]);

    return (
        <>
            <ToastContainer bodyClassName={() => "text-sm font-medium font-gray-800 block px-2"} />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 md:mb-10">Featured Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const response = await store.dispatch(getProducts.initiate());
    const products = response.data as unknown as Data;

    console.log({ response });

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
            products: products.data,
        },
    };
});

export default Home;
