import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPropsContext } from 'next'
import { getPopularMotorcycles, MotorcyclePopulated } from "../lib/db/motorcycle";
import { normalizeJSON } from "../utils/stringify";

const MotorcycleCard: React.FC<{ motorcycle: MotorcyclePopulated }> = ({ motorcycle }) => {
	const [loading, setLoading] = useState(false);

	return (
		<div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
			<a href="#" className="w-full block h-full">
				<img alt="blog photo" src="/images/blog/1.jpg" className="max-h-40 w-full object-cover" />
			</a><div className="bg-white dark:bg-gray-800 w-full p-4"><a href="#" className="w-full block h-full">
				<p className="text-indigo-500 text-md font-medium">
					{motorcycle.motorcycleType.name} - {motorcycle.motorcycleBrand.name}
				</p>
				<p className="text-gray-800 dark:text-white text-xl font-medium mb-2" title={motorcycle.anotherName || motorcycle.name}>
					{motorcycle.name}
				</p>
				<p className="text-gray-400 dark:text-gray-300 font-light text-md">
					{motorcycle.description.slice(0, 100)} ...
				</p>
			</a>
				<div className="flex items-center justify-between mt-4">
					<Link href={'/motorcycle/' + encodeURIComponent(motorcycle.name)} passHref>
						<a className="block relative">
							<button type="button"
								onClick={() => setLoading(true)}
								className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
								{
									loading && <svg width={20} height={20} fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
										<path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
										</path>
									</svg>
								}
								{loading ? 'Cargando...' : 'Visualizar'}
							</button>
						</a>
					</Link>
					<div className="flex flex-col justify-between ml-4 text-sm">
						<p className="text-gray-800 dark:text-white">
							<strong>{motorcycle.engine}</strong> CC
						</p>
						<p className="text-gray-400 dark:text-gray-300">
							{motorcycle.powerHP} HP
									</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Home({ populars }: { populars: MotorcyclePopulated[] }) {
	return (
		<>
			<Head>
				<title>Allmotored</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="w-full p-12">
					<div className="header flex items-end justify-between mb-12">
						<div className="title">
							<p className="text-4xl font-bold text-gray-800 mb-4">
								Lastest articles
            </p>
							<p className="text-2xl font-light text-gray-400">
								All article are verified by 2 experts and valdiate by the CTO
            </p>
						</div>
						<div className="text-end">
							<form className="flex w-full max-w-sm space-x-3">
								<div className=" relative ">
									<input type="text" id="&quot;form-subscribe-Search" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter a title" />
								</div>
								<button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
									Search
              </button>
							</form>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
						{
							populars.map(popular => {
								return <MotorcycleCard key={popular.id} motorcycle={popular} />
							})
						}

						<MotorcycleCard motorcycle={populars[0]} />
						<MotorcycleCard motorcycle={populars[0]} />
						<MotorcycleCard motorcycle={populars[0]} />
						<MotorcycleCard motorcycle={populars[0]} />
					</div>
				</div>

			</main>
		</>
	)
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const populars = await getPopularMotorcycles();

	return {
		props: {
			populars: normalizeJSON(populars),
		},
	}
}
