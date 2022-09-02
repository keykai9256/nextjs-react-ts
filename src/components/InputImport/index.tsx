import * as XLSX from 'xlsx'
import { ChangeEvent } from 'react'

interface Props {
	name?: string
	onChange: (list: string[]) => void
}

const Demo = (props: Props) => {
	const { name, onChange } = props
	const onImportExcel = (file: ChangeEvent<HTMLInputElement>) => {
		const { files } = file.target
		const fileReader = new FileReader()
		fileReader.onload = (event: ProgressEvent<FileReader>) => {
			try {
				const { result } = event.target || {}
				const workbook = XLSX.read(result, { type: 'binary' })
				let data: string[] = []
				for (const sheet in workbook.Sheets) {
					if (workbook.Sheets.hasOwnProperty(sheet)) {
						data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
					}
				}
				onChange(data)
				console.log('data', data)
			} catch (e) {
				console.log('error', e)
			}
		}
		files && fileReader.readAsBinaryString(files[0])
	}
	return (
		<div>
			<h2>{name}</h2>
			<input type="file" accept="*" onChange={e => onImportExcel(e)} />
		</div>
	)
}

export default Demo
