import React, { useState } from "react";
import Head from "next/head";
import { getMotorcycleByName, getMotorcycleNames, MotorcyclePopulated } from "../../lib/db/motorcycle";
import Layout from "../../components/Layout/Layout";
// import SuggestionCard from "../../components/SuggestionCard";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { normalizeJSON } from "../../utils/stringify";
import useSWR from 'swr'
import ImageSlides from "../../components/ImageSlides/ImageSlides";

interface MotorcycleProps {
	motorcycle: MotorcyclePopulated
}

declare var location: any;

const DetailItem: React.FC<{ name: string, value: any }> = ({ name, value }) => {
	return (
		<div className="flex border-t border-gray-200 py-2">
			<span className="text-gray-500">{name}</span>
			<span className="ml-auto text-gray-900">{value}</span>
		</div>
	)
}

export default function Detail({ motorcycle }: MotorcycleProps) {
	const [currentTab, setCurrentTab] = useState(0);
	const { data, error } = useSWR('/api/images?name=' + motorcycle.name)

	const renderContent = () => {
		switch (currentTab) {
			case 0:
				return (
					<>
						<h3>{motorcycle.anotherName}</h3>

						<p className="leading-relaxed mb-4">
							{motorcycle.description}
						</p>

						<DetailItem name={'Compression ratio'} value={motorcycle.compressionRatio} />
						<DetailItem name={'Transmission'} value={motorcycle.transmission + ' speed'} />
						<DetailItem name={'Power HP'} value={(
							<>
								{ motorcycle.powerHP} hp <sub>{motorcycle.powerRPM} rpm </sub>
							</>
						)} />
						<DetailItem name={'Torque'} value={motorcycle.torque + ' N:m'} />
						<DetailItem name={'Fuel capacity'} value={motorcycle.fuelCapacity + ' L'} />
						<DetailItem name={'Production'} value={motorcycle.production} />
						<DetailItem name={'Max speed'} value={motorcycle.maxSpeed ?? 'Not registered'} />
						<DetailItem name={'Seat height'} value={motorcycle.seatHeight + ' mm'} />
					</>
				);
			case 1:
				return (
					<>
						<DetailItem name={'Weight'} value={motorcycle.weight + ' kg'} />
						<DetailItem name={'Power kW'} value={motorcycle.powerKW + ' kW'} />
						<DetailItem name={'Power RPM'} value={motorcycle.powerRPM} />
					</>
				);
		}
	}

	const fbLink = () => {
		return typeof window === 'undefined' ? '' : `https://www.facebook.com/sharer.php?u=${location?.href}`
	}

	const twitLink = () => {
		return typeof window === 'undefined' ? '' : `https://twitter.com/intent/tweet?url=${location?.href}&text=${'Mira esta motocicleta ' + motorcycle.name}&hashtags=allmotored`
	}

	return (
		<>
			<Head>
				<title>{motorcycle.name} - {motorcycle.engine} - {motorcycle.modelYear || (new Date()).getFullYear()}</title>
				<meta name="description" content={motorcycle.description} />
				<meta name="robots" content="index,follow" />
				<meta name="googlebot" content="index,follow" />
				<meta name="subject" content={motorcycle.description} />
				<meta property="og:title" content={motorcycle.description} key="title" />
			</Head>

			<Layout>

				<section
					className="relative text-gray-600 body-font overflow-hidden bg-white lg:w-11/12 mx-auto flex flex-wrap shadow-md rounded-md">
					<div className="lg:w-1/2 w-full p-6 sm:p-8 mb-6 lg:mb-0 order-2 sm:order-1">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">
							{motorcycle.motorcycleBrand.name} - {motorcycle.motorcycleType.name}
						</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{motorcycle.name}</h1>
						<div className="flex mb-4 cursor-pointer">
							<button
								className={"flex-grow border-b-2 py-2 text-lg px-1 focus:outline-none" + (currentTab === 0 ? ' text-indigo-500 border-indigo-500' : 'border-gray-300')}
								onClick={() => setCurrentTab(0)}>
								Description
							</button>
							<button
								className={"flex-grow border-b-2 py-2 text-lg px-1 focus:outline-none" + (currentTab === 1 ? ' text-indigo-500 border-indigo-500' : 'border-gray-300')}
								onClick={() => setCurrentTab(1)}>
								Details
							</button>
						</div>

						{renderContent()}

						<div className="flex mt-8">
							<span className="title-font font-medium text-2xl text-gray-900"><b>{motorcycle.engine}</b> CC</span>

							<div className="ml-auto inline-flex">
								<a className="text-gray-500" href={fbLink()} target="_blank" rel="noopener noreferrer" title="Compartir en Facebook">
									<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-7 h-7" viewBox="0 0 24 24">
										<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
									</svg>
								</a>
								<a className="ml-4 text-gray-500" href={twitLink()} target="_blank" rel="noopener noreferrer" title="Compartir en Twitter">
									<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-7 h-7" viewBox="0 0 24 24">
										<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
									</svg>
								</a>
							</div>
						</div>
					</div>

					<ImageSlides
						loading={!data}
						imagePaths={data?.images}
						name={motorcycle.name}
					/>
				</section>

				{/* <section className='p-6 sm:p-12'>
					<h2 className='text-gray-900 text-3xl title-font font-medium mb-4'>Similares</h2>

					<div className='flex flex-wrap justify-center mt-12'>
						<SuggestionCard motorcycle={motorcycle} />
						<SuggestionCard motorcycle={motorcycle} />
						<SuggestionCard motorcycle={motorcycle} />
					</div>
				</section> */}

				<div className='mx-auto w-full text-center mt-6 text-xs'>
					<i>Updated at {motorcycle.updatedAt}</i>
				</div>
			</Layout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	const names = await getMotorcycleNames();
	const paths = names.map(n => '/motorcycle/' + n.name);

	return {
		paths: [...paths],
		fallback: false,
	}
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<{ props: MotorcycleProps }> {
	const motorcycleName = context.params.name as string;
	const motorcycle = await getMotorcycleByName(motorcycleName);

	return {
		props: {
			motorcycle: normalizeJSON(motorcycle)
		}
	}
}