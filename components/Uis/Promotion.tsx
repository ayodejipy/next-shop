import Image from "next/image"
import SneakersA from "../../public/images/sneakers-1.png"
import SneakersB from "../../public/images/sneakers-2.png"
import SneakersC from "../../public/images/sneakers-3.webp"
import SneakersD from "../../public/images/sneakers-2.webp"

const Promotion = () => {
    return (
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 mb-6 mt-8 sm:mt-16 sm:mb-16 bg-gradient-to-r from-indigo-400 bg-indigo-600 relative">
            <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                <div className="sm:max-w-lg">
                    <h1 className="font text-4xl font-bold tracking-normal text-white sm:text-6xl">10% off your first purchase.</h1>
                    <p className="mt-4 text-xl font-light text-gray-200">New customers can get 10% off their first purchase with the code W*LCO*E10 at checkout.</p>
                </div>
                <div>
                    <div className="mt-10">
                        {/* Decorative image grid */}
                        <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                            <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                <div className="flex items-center space-x-6 lg:space-x-8">
                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
										<div className="h-64 w-44 overflow-hidden rounded-lg">
											<Image
												src={SneakersA}
												alt="First sneaker"
												width={200}
												height={200}
												className="h-full w-full object-cover object-center" 
											/>
                                        </div>
                                    </div>
                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                        <div className="h-64 w-44 overflow-hidden rounded-lg">
											<Image
												src={SneakersB}
												alt="Second sneaker"
												width={200}
												height={200}
												className="h-full w-full object-cover object-center" 
											/>
										</div>
                                    </div>
                                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
										<div className="h-64 w-44 overflow-hidden rounded-lg">
											<Image
												src={SneakersC}
												alt="Second sneaker"
												width={200}
												height={200}
												className="h-full w-full object-cover object-center" 
											/>
										</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="#" className="inline-block rounded-md border border-transparent bg-green-600 py-3 px-8 text-center font-medium text-white hover:bg-green-700">
                            Shop Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promotion;
