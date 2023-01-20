import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { navigation } from '@/utils/links'

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }
	
	return (
		<>
			<header className="relative z-10">
				<nav aria-label="Top">
				{/* Top navigation */}
				<div className="bg-gray-900">
					<div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
						Get free delivery on orders over $100
					</p>

					<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
						<a href="#" className="text-sm font-medium text-white hover:text-gray-100">
						Create an account
						</a>
						<span className="h-6 w-px bg-gray-600" aria-hidden="true" />
						<a href="#" className="text-sm font-medium text-white hover:text-gray-100">
						Sign in
						</a>
					</div>
					</div>
				</div>

				{/* Secondary navigation */}
				<div className="bg-white">
					<div className="border-b border-gray-200">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
						{/* Logo (lg+) */}
						<div className="hidden lg:flex lg:items-center">
							<a href="#">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt=""
							/>
							</a>
						</div>

						{/* Mobile menu and search (lg-) */}
						<div className="flex flex-1 items-center lg:hidden">
							<button
							type="button"
							className="-ml-2 rounded-md bg-white p-2 text-gray-400"
							onClick={() => setMobileMenuOpen(true)}
							>
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
							<img
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt=""
							className="h-8 w-auto"
							/>
						</a>

						<div className="flex flex-1 items-center justify-end">
							<div className="flex items-center lg:ml-8">
							<div className="flex space-x-8">
								<div className="hidden lg:flex">
								<a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
									<span className="sr-only">Search</span>
									<MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
								</a>
								</div>

								<div className="flex">
								<a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
									<span className="sr-only">Account</span>
									<UserIcon className="h-6 w-6" aria-hidden="true" />
								</a>
								</div>
							</div>

							<span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />

							<div className="flow-root">
								<a href="#" className="group -m-2 flex items-center p-2">
								<ShoppingCartIcon
									className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
									aria-hidden="true"
								/>
								<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
								<span className="sr-only">items in cart, view bag</span>
								</a>
							</div>
							</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				</nav>
			</header>
		</>
	)
}

export default Navbar;