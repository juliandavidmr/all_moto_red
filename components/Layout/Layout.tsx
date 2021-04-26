import Link from "next/link";
import React from "react";

interface LayoutProps {
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<header className="text-gray-600 body-font">
				<div className="container mx-auto flex flex-wrap p-4 sm:p-6 flex-row sm:flex-col md:flex-row items-center justify-between sm:justify-center">
					<a className="flex title-font font-medium items-center text-gray-900 sm:mb-4 md:mb-0">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
							<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
						</svg>
						<span className="ml-3 text-xl">Allmotored</span>
					</a>
					<nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
						<Link href='/' passHref>
							<a className="mr-5 hover:text-gray-900">Home</a>
						</Link>
					</nav>
					<Link href='/'>
						<button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base sm:mt-4">
							Go to home
							<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 ml-1" viewBox="0 0 24 24">
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</button>
					</Link>
				</div>
			</header>

			<main className="w-full p-6 md:p-12">
				{children}
			</main>
		</>
	);
}

export default Layout;