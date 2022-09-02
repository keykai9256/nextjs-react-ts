import { useState } from 'react'
import InputImport from '../../components/InputImport'

const Home = () => {
	const [data, setData] = useState<string[]>()
	return (
		<div>
			<InputImport name={'import'} onChange={val => setData(val)}/>
			{JSON.stringify(data)}
		</div>
	)
}

export default Home
