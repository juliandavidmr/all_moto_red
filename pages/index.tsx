import React, { useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { GetStaticPropsContext } from 'next'
import { getPopularMotorcycles, MotorcyclePopulated } from "../lib/db/motorcycle";
import { normalizeJSON } from "../utils/stringify";
import LoadingIcon from "../components/LoadingIcon";
import useSWR from "swr";
import Navbar from "../components/Navbar";

const MotorcycleCard: React.FC<{ motorcycle: MotorcyclePopulated }> = ({ motorcycle }) => {
	const [ loading, setLoading ] = useState(false);
	const { data } = useSWR('/api/images?name=' + motorcycle.name)

	return (
		<div className="overflow-hidden shadow-lg rounded-lg h-90 w-full sm:w-70 md:w-80 cursor-pointer m-auto">
			<div className="w-full h-full relative bg-white">
				{ (data && data.images && data.images.length) ?
					<Image title={ motorcycle.name } src={ data.images[0] } layout={ 'responsive' } width={ 300 } height={ 200 }
					       className="max-h-40 w-full object-cover"/> :
					<LoadingIcon/>
				}
			</div>
			<div className="bg-white dark:bg-gray-800 w-full p-4"><a href="#" className="w-full block h-full">
				<p className="text-indigo-500 text-md font-medium">
					{ motorcycle.motorcycleType.name } - { motorcycle.motorcycleBrand.name }
				</p>
				<p className="text-gray-800 dark:text-white text-xl font-medium mb-2"
				   title={ motorcycle.anotherName || motorcycle.name }>
					{ motorcycle.name }
				</p>
				<p className="text-gray-400 dark:text-gray-300 font-light text-md">
					{ motorcycle.description.slice(0, 100) } ...
				</p>
			</a>
				<div className="flex items-center justify-between mt-4">
					<Link href={ '/motorcycle/' + encodeURIComponent(motorcycle.name) } passHref>
						<a className="block relative">
							<button type="button"
							        onClick={ () => setLoading(true) }
							        className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
								{
									loading && <LoadingIcon/>
								}
								{ loading ? 'Cargando...' : 'Visualizar' }
							</button>
						</a>
					</Link>
					<div className="flex flex-col justify-between ml-4 text-sm">
						<p className="text-gray-800 dark:text-white">
							<strong>{ motorcycle.engine }</strong> CC
						</p>
						<p className="text-gray-400 dark:text-gray-300">
							{ motorcycle.powerHP } HP
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
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<Navbar selectedIndex={0} />

			<main>
				<div className="w-full p-6 sm:p-12">
					<div className="header flex items-end flex-col md:flex-row justify-between mb-12">
						<div className="title">
							<h1 className="text-4xl font-bold text-gray-800 mb-4">
								Motocicletas más populares
							</h1>
							<p className="text-2xl font-light text-gray-400">
								Biblioteca de motocicletas del mundo, filtre y visualize las motocicletas más populares.
							</p>
						</div>
						<div className="text-end mt-6 sm:mt-0 w-full md:w-80">
							<form className="flex w-full max-w-sm space-x-3">
								<input type="text" id="&quot;form-subscribe-Search"
								       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
								       placeholder="Enter a title"/>
								<button
									className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
									type="submit">
									Buscar
								</button>
							</form>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
						{
							populars.map(popular => {
								return <MotorcycleCard key={ popular.id } motorcycle={ popular }/>
							})
						}
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
