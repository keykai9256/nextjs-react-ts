import { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql'

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456789",
    port:3306,
    database: "test",
})

const getInfoUser = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'GET') {
			return res.status(500).json({ error: 'method is not allowed' })
		}
		db.query("SELECT * FROM t_user", (err, result) => {
			if (err) {
				console.log(err);
			} else {
				return res.status(200).json({ success: true, data: result })
			}
		})
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}

export default getInfoUser
