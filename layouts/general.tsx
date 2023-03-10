import type { NextPage } from "next";
import Head from 'next/head'
import { useState } from "react";
import Navbar from "@/components/layouts/general/Navbar";
import Footer from "@/components/layouts/general/Footer";
import { Bars3Icon } from "@heroicons/react/24/outline";

const GeneralLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = (value: boolean): void => {
		setSidebarOpen(value)
	}
	
    return (
        <>
            <Head>
                <title>Marketplace.</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="bg-white">
                <Navbar />
                <main>
                   {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default GeneralLayout;
