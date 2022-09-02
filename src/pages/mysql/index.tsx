import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getInfoUser } from '../../api/getInfoUser'

const Home = () => {
	const router = useRouter()
	const { id } = router.query
	const [data, setData] = useState('')
	useEffect(() => {
		const init = async () => {
			try {
				const res = await getInfoUser()
				const json = await res.json()
				setData(json.data)
			} catch {
				setData('')
			}
		}
		id && init()
	}, [id])
	return (
		<div>
			<h2>mysql?id=xx</h2>
			{JSON.stringify(data)}
		</div>
	)
}

export default Home
