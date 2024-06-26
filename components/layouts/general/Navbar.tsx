import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import CartItems from "@/components/product/CartItems";
import Modal from "@/components/Uis/Modal";
import UserAvatar from "@/components/user/Avatar";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/user";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((store) => store.user.cart);
    const user = useAppSelector((store) => store.user.user);
    // open cart state
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }

    const checkLogin = () => {
        if (!user) return dispatch(clearUser());
    };

    const toggleModal = () => {
        // negate the previous value
        setOpenModal((prev) => !prev);
    };

    return (
        <>
            <header className="relative z-10">
                <nav aria-label="Top">
                    {/* Top navigation */}
                    <div className="bg-gray-900" data-testid="topnav">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">Get free delivery on orders over $100</p>

                            {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                    Create an account
                                </a>
                                <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                                <a href="#" className="text-sm font-medium text-white hover:text-gray-100">
                                    Sign in
                                </a>
                            </div> */}
                        </div>
                    </div>

                    {/* Secondary navigation */}
                    <div className="bg-white">
                        <div className="border-b border-gray-200">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo (lg+) */}
                                    <div className="hidden lg:flex lg:items-center" data-testid="logo-wrapper">
                                        <Link href="/">
                                            <span className="sr-only">Your Company</span>
                                            {/* <Image
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                                alt="Company's logo"
                                                fill
                                            /> */}
                                            <Image width={32} height={32} src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                                        </Link>
                                    </div>

                                    {/* Mobile menu and search (lg-) */}
                                    <div className="flex flex-1 items-center lg:hidden">
                                        <button type="button" className="-ml-2 rounded-md bg-white p-2 text-gray-400" onClick={() => setMobileMenuOpen(true)}>
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Search */}
                                        <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    </div>

                                    {/* Logo (lg-) */}
                                    <a href="#" className="lg:hidden">
                                        <span className="sr-only">Your Company</span>
                                        <Image width={50} height={50} className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Company's logo" />
                                    </a>

                                    <div className="flex flex-1 items-center justify-end">
                                        <div className="flex items-center lg:ml-8">
                                            <div className="flex space-x-8">
                                                <div className="hidden">
                                                    <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Search</span>
                                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                                    </a>
                                                </div>

                                                <div className="flex items-center" data-testid="user-profile">
                                                    {user && user._id ? (
                                                        <UserAvatar user={user} />
                                                    ) : (
                                                        <>
                                                            <Link data-testid="user-icon" href="/auth/login" className="-m-2 p-2 inline-block sm:hidden text-gray-400 hover:text-gray-500">
                                                                <span className="sr-only">Account</span>
                                                                <UserIcon className="h-6 w-6" aria-hidden="true" />
                                                            </Link>
                                                            <div ata-testid="auth-links" className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                                                <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                    Sign in
                                                                </Link>
                                                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                                                <Link href="/auth/login" onClick={toggleModal} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                                    Create account
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

                                            <div className="flow-root" data-testid="cart-wrapper">
                                                <button type="button" onClick={() => setOpen(true)} className="group -m-2 flex items-center p-2">
                                                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-800 group-hover:text-gray-500" aria-hidden="true" />
                                                    <span data-testid="cart-value" className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                        {cart?.length}
                                                    </span>
                                                    <span className="sr-only">items in cart, view bag</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* cart */}
            <CartItems open={open} toggle={setOpen} />

            {/* <Modal isOpen={openModal} toggleModal={toggleModal}>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>
                </div>
            </Modal> */}
        </>
    );
};

export default Navbar;
