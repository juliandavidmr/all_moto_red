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
	return <div className="flex border-t border-gray-200 py-2">
		<span className="text-gray-500">{ name }</span>
		<span className="ml-auto text-gray-900">{ value }</span>
	</div>
}

export default function Detail({ motorcycle }: MotorcycleProps) {
	const [currentTab, setCurrentTab] = useState(0);

	const renderContent = () => {
		switch (currentTab) {
			case 0:
				return (
					<>
						<h3>{ motorcycle.anotherName }</h3>

						<p className="leading-relaxed mb-4">
							{motorcycle.description}
						</p>

						<DetailItem name={ 'Compression ratio' } value={ motorcycle.compressionRatio }/>
						<DetailItem name={ 'Transmission' } value={ motorcycle.transmission + ' speed'}/>
						<DetailItem name={ 'Power HP' } value={(
							<>
								{ motorcycle.powerHP } hp <sub>{ motorcycle.powerRPM } rpm </sub>
							</>
						)}/>
					</>
				);
			case 1:
				return (
					<>
						<DetailItem name={ 'Torque' } value={ motorcycle.torque + ' N:m'}/>
						<DetailItem name={ 'Fuel capacity' } value={ motorcycle.fuelCapacity + ' L'}/>
						<DetailItem name={ 'Weight' } value={ motorcycle.weight + ' kg'}/>
						<DetailItem name={ 'Production' } value={ motorcycle.production }/>
						<DetailItem name={ 'Seat height' } value={ motorcycle.seatHeight + ' mm'}/>
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
				<title>{motorcycle.name} - {motorcycle.engine}</title>
				<meta name="description" content={motorcycle.description}/>
				<meta name="robots" content="index,follow"/>
				<meta name="googlebot" content="index,follow"/>
				<meta name="subject" content={motorcycle.description} />
			</Head>

			<Layout>

				<section className="relative text-gray-600 body-font overflow-hidden bg-white lg:w-11/12 mx-auto flex flex-wrap shadow-md rounded-md">
					<div className="lg:w-1/2 w-full p-6 sm:p-8 mb-6 lg:mb-0 order-2 sm:order-1">
						<h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
						<h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{motorcycle.name}</h1>
						<div className="flex mb-4 cursor-pointer">
							<button className={ "flex-grow border-b-2 py-2 text-lg px-1 focus:outline-none" + (currentTab === 0 ? ' text-indigo-500 border-indigo-500' : 'border-gray-300')}
							        onClick={() => setCurrentTab(0)}>
								Description
							</button>
							<button className={ "flex-grow border-b-2 py-2 text-lg px-1 focus:outline-none"  + (currentTab === 1 ? ' text-indigo-500 border-indigo-500' : 'border-gray-300')}
							        onClick={() => setCurrentTab(1)}>
								Details
							</button>
						</div>

						{renderContent()}

						<div className="flex">
							<span className="title-font font-medium text-2xl text-gray-900"><b>{motorcycle.engine}</b> CC</span>
							<button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
							<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
								<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
									<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
								</svg>
							</button>
						</div>
					</div>
					<img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded order-1 sm:order-2" src="https://dummyimage.com/400x400" />
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