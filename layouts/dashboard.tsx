import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import SideBar from "@/components/layouts/dashboard/SideBar";
import { Bars3Icon } from "@heroicons/react/24/outline";

const GeneralLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (value: boolean): void => {
        setSidebarOpen(value);
    };

    return (
        <>
            <Head>
                <title>Marketplace.</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex h-full">
                <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
                            <div>
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Marketplace logo" />
                            </div>
                            <div>
                                <button type="button" className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
                                    <span className="sr-only">Open sidebar</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 flex flex-1 overflow-hidden">{children}</div>
                </div>
            </div>
        </>
    );
};

export default GeneralLayout;
