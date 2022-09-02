export const getInfoSpider = async () => {
	return await fetch('/api/getInfoSpider', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
