import { Fragment } from "react";
import Image from "next/image"
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, HomeIcon, MagnifyingGlassCircleIcon, MapIcon, MegaphoneIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    { name: "Teams", href: "#", icon: UserGroupIcon, current: false },
    { name: "Directory", href: "#", icon: MagnifyingGlassCircleIcon, current: false },
    { name: "Announcements", href: "#", icon: MegaphoneIcon, current: false },
    { name: "Office Map", href: "#", icon: MapIcon, current: false },
];

const SideBar = ({ open, toggleSidebar }: { open: boolean; toggleSidebar: (arg: boolean) => void }) => {

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={toggleSidebar}>
                    <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                                <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button type="button" className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => toggleSidebar(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <Image width={100} height={100}  className="h-8 w-auto" src="https://tailwindui.com/Image width={100} height={100} /logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                                    </div>
                                    <nav aria-label="Sidebar" className="mt-5">
                                        <div className="space-y-1 px-2">
                                            {navigation.map((item) => (
                                                <a key={item.name} href={item.href} className={classNames(item.current ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", "group flex items-center px-2 py-2 text-base font-medium rounded-md")}>
                                                    <item.icon className={classNames(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-4 h-6 w-6")} aria-hidden="true" />
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                                <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                    <a href="#" className="group block flex-shrink-0">
                                        <div className="flex items-center">
                                            <div>
                                                <Image width={100} height={100}  className="inline-block h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Whitney Francis</p>
                                                <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex w-64 flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            <div className="flex flex-shrink-0 items-center px-4">
                                <Image width={100} height={100}  className="h-8 w-auto" src="https://tailwindui.com/Image width={100} height={100} /logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                            </div>
                            <nav className="mt-5 flex-1" aria-label="Sidebar">
                                <div className="space-y-1 px-2">
                                    {navigation.map((item) => (
                                        <a key={item.name} href={item.href} className={classNames(item.current ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", "group flex items-center px-2 py-2 text-sm font-medium rounded-md")}>
                                            <item.icon className={classNames(item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500", "mr-3 h-6 w-6")} aria-hidden="true" />
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </nav>
                        </div>
                        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                            <a href="#" className="group block w-full flex-shrink-0">
                                <div className="flex items-center">
                                    <div>
                                        <Image width={100} height={100}  className="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Whitney Francis</p>
                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
