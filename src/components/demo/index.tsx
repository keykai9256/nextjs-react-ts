interface Props {
	name?: string
}

const Demo = (props: Props) => {
	const { name } = props
	return (
		<div>
			<p>Demo</p>
			<div>{name}</div>
		</div>
	)
}

export default Demo
