import Head from 'next/head'
import type { NextPage } from 'next'

export default function Home() {
  return (
    <>
			<main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
				{/* Start main area*/}
				<div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
					<div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
				</div>
				{/* End main area */}
			</main>
			<aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-l border-gray-200 xl:flex xl:flex-col">
				{/* Start secondary column (hidden on smaller screens) */}
				<div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
					<div className="h-full rounded-lg border-2 border-dashed border-gray-200" />
				</div>
				{/* End secondary column */}
			</aside>
    </>
  )
}
