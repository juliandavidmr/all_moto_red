import { Motorcycle, MotorcycleBrand, MotorcycleLinks, MotorcycleType } from '@prisma/client';
import { getMotorcycleByName, getMotorcycleNames } from "../../db/motorcycle";
import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { normalizeJSON } from "../../utils/stringify";
import Head from "next/head";

interface MotorcycleProps {
	motorcycle: Motorcycle & {
		motorcycleLinks: MotorcycleLinks[],
		motorcycleType: MotorcycleType,
		motorcycleBrand: MotorcycleBrand
	};
}

const DetailItem: React.FC<{ name: string, value: any }> = ({ name, value }) => {
	return (
		<div className="flex border-t border-gray-200 py-2">
			<span className="text-gray-500">{ name }</span>
			<span className="ml-auto text-gray-900">{ value }</span>
		</div>
	)
}

const SuggestionCard: React.FC = () => {
	return (
		<div className="flex-initial">
			<div className="flex items-center justify-center w-full">
				<div className="w-full py-6 px-3">
					<div className="bg-white shadow-xl rounded-lg overflow-hidden">
						<div className="bg-cover bg-center h-56 p-4" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)'}}>
							<div className="flex justify-end">
								<svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z" />
								</svg>
							</div>
						</div>
						<div className="p-4">
							<p className="uppercase tracking-wide text-sm font-bold text-gray-700">Detached house • 5y old</p>
							<p className="text-3xl text-gray-900">$750,000</p>
							<p className="text-gray-700">742 Evergreen Terrace</p>
						</div>
						<div className="flex p-4 border-t border-gray-300 text-gray-700">
							<div className="flex-1 inline-flex items-center">
								<svg className="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z" />
								</svg>
								<p><span className="text-gray-900 font-bold">3</span> Bedrooms</p>
							</div>
							<div className="flex-1 inline-flex items-center">
								<svg className="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path fillRule="evenodd" d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z" />
								</svg>
								<p><span className="text-gray-900 font-bold">2</span> Bathrooms</p>
							</div>
						</div>
						<div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
							<div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Realtor</div>
							<div className="flex items-center pt-2">
								<div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)'}}>
								</div>
								<div>
									<p className="font-bold text-gray-900">Tiffany Heffner</p>
									<p className="text-sm text-gray-700">(555) 555-4321</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Detail({ motorcycle }: MotorcycleProps) {
	const [ currentTab, setCurrentTab ] = useState(0);

	const renderContent = () => {
		switch (currentTab) {
			case 0:
				return (
					<>
						<h3>{ motorcycle.anotherName }</h3>

						<p className="leading-relaxed mb-4">
							{ motorcycle.description }
						</p>

						<DetailItem name={ 'Compression ratio' } value={ motorcycle.compressionRatio }/>
						<DetailItem name={ 'Transmission' } value={ motorcycle.transmission + ' speed' }/>
						<DetailItem name={ 'Power HP' } value={ (
							<>
								{ motorcycle.powerHP } hp <sub>{ motorcycle.powerRPM } rpm </sub>
							</>
						) }/>
					</>
				);
			case 1:
				return (
					<>
						<DetailItem name={ 'Torque' } value={ motorcycle.torque + ' N:m' }/>
						<DetailItem name={ 'Fuel capacity' } value={ motorcycle.fuelCapacity + ' L' }/>
						<DetailItem name={ 'Weight' } value={ motorcycle.weight + ' kg' }/>
						<DetailItem name={ 'Production' } value={ motorcycle.production }/>
						<DetailItem name={ 'Seat height' } value={ motorcycle.seatHeight + ' mm' }/>
						<DetailItem name={ 'Max speed' } value={ motorcycle.maxSpeed ?? 'Not registered' }/>
						<DetailItem name={ 'Power kW' } value={ motorcycle.powerKW + ' kW' }/>
						<DetailItem name={ 'Power RPM' } value={ motorcycle.powerRPM }/>
					</>
				);
		}
	}

	return (
		<>
			<Head>
				<title>{ motorcycle.name } - { motorcycle.engine }</title>
				<meta name="description" content={ motorcycle.description }/>
				<meta name="robots" content="index,follow"/>
				<meta name="googlebot" content="index,follow"/>
				<meta name="subject" content={ motorcycle.description }/>
			</Head>

			<Layout>

				<section
					className="relative text-gray-600 body-font overflow-hidden bg-white lg:w-11/12 mx-auto flex flex-wrap shadow-md rounded-md">
					<div className="lg:w-1/2 w-full p-6 sm:p-8 mb-6 lg:mb-0 order-2 sm:order-1">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{ motorcycle.name }</h1>
						<div className="flex mb-4 cursor-pointer">
							<button
								className={ "flex-grow border-b-2 py-2 text-lg px-1 focus:outline-none" + (currentTab === 0 ? ' text-indigo-500 border-indigo-500' : 'border-gray-300') }
								onClick={ () => setCurrentTab(0) }>
								Description
							</button>
							<button
								className={ "flex-grow border-b-2 py-2 text-lg px-1 focus:outline-none" + (currentTab === 1 ? ' text-indigo-500 border-indigo-500' : 'border-gray-300') }
								onClick={ () => setCurrentTab(1) }>
								Details
							</button>
						</div>

						{ renderContent() }

						<div className="flex mt-4">
							<span className="title-font font-medium text-2xl text-gray-900"><b>{ motorcycle.engine }</b> CC</span>
							<button
								className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button
							</button>
							<button
								className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
								<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 }
								     className="w-5 h-5" viewBox="0 0 24 24">
									<path
										d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
								</svg>
							</button>
						</div>
					</div>
					<img alt={motorcycle.anotherName || motorcycle.name}
					     className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded order-1 sm:order-2"
					     src="https://dummyimage.com/400x400"/>
				</section>

				<section className='p-6 sm:p-12'>
					<h2 className='text-gray-900 text-3xl title-font font-medium mb-4'>Similares</h2>

					<div className='flex flex-wrap justify-center mt-12'>
						<SuggestionCard />
						<SuggestionCard />
						<SuggestionCard />
					</div>
				</section>

				<div className='mx-auto w-full text-center mt-6 text-xs'>
					<i>Updated at { motorcycle.updatedAt }</i>
				</div>
			</Layout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	const names = await getMotorcycleNames();
	const paths = names.map(n => '/motorcycle/' + n.name);

	return {
		paths: [ ...paths ],
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