import { useEffect } from "react";
import { useRouter } from "next/router";
import Product from "@/components/product/product";
import Banner from "@/components/Uis/Banner";
import Promotion from "@/components/Uis/Promotion";
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
                toast.success("Your order has been confirmed, kindly check your email for further instructions.", toastConfig);
            }
            if (cancelled !== undefined) {
                toast.error("Hey there! 😞, your order has been cancelled!", toastConfig);
            }
        }
        handleNotifications();

        // clean up function for toasts remounting
        return () => toast.dismiss();
    }, [success, cancelled, dispatch]);

    return (
        <>
            <ToastContainer bodyClassName={() => "text-sm font-medium font-gray-800 block px-2"} />
            <Banner />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="md:mb-16 lg:mb-20">
                        <h2 className="text-3xl text-center font-bold tracking-tight leading-wide text-gray-900">Featured Products</h2>
                        <p className="text-gray-500 text-center leading-normal">Our feature products are carefully selected based on their quality, style, and functionality. We pride ourselves on providing our customers with a wide range of high-quality products that not only meet but exceed their expectations.</p>
                    </div>

                    {products.length >= 1 && (
                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Promotion />
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const response = await store.dispatch(getProducts.initiate());
    // console.log({ response });

    // console.log(process.env.NEXT_PUBLIC_BASE_URL);

    let products: Data = {
        message: "",
        success: false,
    };
    if (!response.isError) products = response.data as unknown as Data;

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
        props: {
            products: products.data ?? [],
        },
    };
});

export default Home;
