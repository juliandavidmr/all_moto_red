export function normalizeJSON(str: any) {
	return JSON.parse(JSON.stringify(str, (key, value) =>
		typeof value === 'bigint'
			? value.toString()
			: value // return everything else unchanged
	));
}