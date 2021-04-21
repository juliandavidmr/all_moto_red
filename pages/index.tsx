import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetStaticPropsContext } from 'next'
import { getPopularMotorcycles } from "../db/motorcycle";
import { Motorcycle } from '@prisma/client';
import { normalizeJSON } from "../utils/stringify";
import React from 'react';
import Link from 'next/link'

export async function getStaticProps(context: GetStaticPropsContext) {
	const populars = await getPopularMotorcycles();

	return {
		props: {
			populars: normalizeJSON(populars),
		},
	}
}

export default function Home({ populars }: { populars: Motorcycle[] }) {
	return (
		<div className={ styles.container }>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<main className={ styles.main }>
				{
					populars.map(popular => {
						return (
							<section key={ popular.id }>
								<h1>{ popular.name }</h1>
								<h2>{ popular.anotherName }</h2>
								<p>{ popular.description }</p>
								<Link href={ '/motorcycle/' + encodeURIComponent(popular.name) } scroll={true}>
									<a>Ver</a>
								</Link>
							</section>
						)
					})
				}

				<div className={ styles.grid }>
					<a href="https://nextjs.org/docs" className={ styles.card }>
						<h3>Documentation &rarr;</h3>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href="https://nextjs.org/learn" className={ styles.card }>
						<h3>Learn &rarr;</h3>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a
						href="https://github.com/vercel/next.js/tree/master/examples"
						className={ styles.card }
					>
						<h3>Examples &rarr;</h3>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						className={ styles.card }
					>
						<h3>Deploy &rarr;</h3>
						<p>
							Instantly deploy your Next.js site to a public URL with Vercel.
						</p>
					</a>
				</div>
			</main>

			<footer className={ styles.footer }>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{ ' ' }
					<img src="/vercel.svg" alt="Vercel Logo" className={ styles.logo }/>
				</a>
			</footer>
		</div>
	)
}
