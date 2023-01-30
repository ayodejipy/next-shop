import type { NextPage } from "next";
import { GoogleLogin } from "@react-oauth/google";
import { useAddUserMutation } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUsers } from "@/store/user";
import { getAuthUser } from "@/utils";
import { User } from "@/types/user";
import type { NextPageWithLayout } from "@/pages/_app";
import GuestLayout from "@/layouts/guest";

const SignIn: NextPageWithLayout = () => {
    // STATES
    const user = useAppSelector((state) => state.user.user);
    const dispatch = useAppDispatch();

    // METHODS
    const [addUser, { data, isLoading }] = useAddUserMutation();

    const handleLogin = async (credential: any): Promise<void> => {
        const { user } = getAuthUser(credential);

        await addUser(user)
            .unwrap()
            .then((response: any) => {
                const { _rev, _updatedAt, _createdAt, _type, ...rest } = response.data;
                dispatch(getUsers(rest));
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
    return (
        <GuestLayout>
            { page }
        </GuestLayout>
    )
}

export default SignIn;
