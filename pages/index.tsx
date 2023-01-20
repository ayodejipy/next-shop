import Head from "next/head";
import type { NextPage } from "next";
import Product from "@/components/product/product";
import { getProducts, getRunningQueriesThunk } from "@/services/api";
import { wrapper } from "@/store";
import type { IProduct } from "@/types/product";
import type { Data } from "./api/product";

const Home = ({ products }: { products: IProduct[] }) => {
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 md:mb-10">Featured Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        { products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {

    const response = await store.dispatch(getProducts.initiate());
    const products = response.data as unknown as Data;
  
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
      props: {
        products: products.data
    }
  }
})

export default Home