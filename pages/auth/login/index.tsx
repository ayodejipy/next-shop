import type { NextPage } from "next";

const SignIn: NextPage = () => {
    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
					<img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
						alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                 
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Login with Google
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
