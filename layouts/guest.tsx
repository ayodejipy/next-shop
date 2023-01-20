import type { NextPage } from "next";

const GuestLayout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="w-full h-full">{ children }</div>
	)
}

export default GuestLayout;