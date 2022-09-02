export const getInfoUser = async () => {
	return await fetch('/api/getInfoUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
