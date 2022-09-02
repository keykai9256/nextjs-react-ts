import { NextApiRequest, NextApiResponse } from 'next'
import https from 'https'

// 抓取页面内容
const spiderService = () => {
	return new Promise((resolve, reject) => {
		https.get('https://www.baidu.com', res => {
			let html = ''
			res.on('data', function (chunk) {
				html += chunk
			})
			res.on('error', err => {
				reject(err)
			})
			res.on('end', () => {
				resolve(html)
			})
		})
	})
}

const getInfoSpider = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'GET') {
			return res.status(500).json({ error: 'method is not allowed' })
		}
		const data = await spiderService()
		return res.status(200).json({ success: true, data })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default getInfoSpider
