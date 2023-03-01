import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { GoogleLogin } from "@react-oauth/google";
import { useAddUserMutation, useSyncCartToUserMutation } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUsers } from "@/store/user";
import { getAuthUser } from "@/utils";
import type { NextPageWithLayout } from "@/pages/_app";
import GuestLayout from "@/layouts/guest";
import type { ICartProduct, ICartObject } from "@/types/product";

const SignIn: NextPageWithLayout = () => {
    const router = useRouter();
    // STATES
    const user = useAppSelector((state) => state.user.user);
    const cart = useAppSelector((state) => state.user.cart);
    const dispatch = useAppDispatch();

    // METHODS
    const [addUser, { data, isLoading }] = useAddUserMutation();
    const [syncCartToUser, result] = useSyncCartToUserMutation();

    async function migrateCart(cart: ICartObject) {
        // trigger mutation
        await syncCartToUser(cart).unwrap()
        .then((response: any) => console.log('Successfully migrated carts for user'))
        .catch((e: any)  => console.log('Migration failed'))
    }

    const handleLogin = async (credential: any): Promise<void> => {
        const { user } = getAuthUser(credential);

        await addUser(user)
            .unwrap()
            .then((response: any) => {
                const { _rev, _updatedAt, _createdAt, _type, ...rest } = response.data;
                dispatch(getUsers(rest));

                // check if cart is not empty
                if (cart.length > 0) {
                    const modifiedCart = cart.map((item: ICartProduct) => {
                        const newProductmarkup = { _type: 'product', _ref: item.item._id };
                        const newProduct = { item: newProductmarkup, quantity: item.quantity };

                        return newProduct;
                    });

                    // sync items in cart to current user
                    const item = {
                        _type: "carts",
                        items: modifiedCart,
                        owner: {
                            _type: "reference",
                            _ref: rest._id,
                        },
                    } as unknown as ICartObject;
                    
                    // migrateCart(item);
                }

                router.push("/");
            });
    };

    return (
        <>
            <div className="flex h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 flex justify-center">
                        {isLoading ? (
                            <p> Loading... </p>
                        ) : (
                            <div>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => handleLogin(credentialResponse)}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

SignIn.getLayout = function getLayout(page: React.ReactElement) {
    return <GuestLayout>{page}</GuestLayout>;
};

export default SignIn;
