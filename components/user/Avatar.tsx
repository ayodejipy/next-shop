import { Fragment } from "react";
import Image from "next/image"
import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/user";
import type { User } from "@/types/user";

type IProps = User;

function UserAvatar({ user }: { user: IProps }) {
    const dispatch = useAppDispatch();

    return (
        <Menu as="div" className="relative ml-3" data-testid="user-avatar">
            <div>
                <Menu.Button className="user-icon flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <Image width={36} height={36} className="inline-block h-9 w-9 rounded-full" src={user.avatar} alt={user.name} />
                </Menu.Button>
            </div>
            <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <button data-testid="logout-btn" type="button" onClick={() => dispatch(clearUser())} className="block px-4 py-2 text-sm text-red-600">
                                Sign out
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default UserAvatar;
