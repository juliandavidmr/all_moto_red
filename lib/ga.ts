// log the pageview with their URL
export const pageview = (url: string) => {
	if (typeof (window as any).gtag === "function") {
		(window as any).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
			page_path: url,
		})
	}
}

// log specific events happening.
export const event = ({ action, params }) => {
	if (typeof (window as any).gtag === "function") {
		(window as any).gtag('event', action, params)
	}
}