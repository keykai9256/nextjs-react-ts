const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')
const ip = require('ip')

// 当前 IP
const currentIP = ip.address()

const devProxy = {
	'/nextApi': {
		target: 'https://xxx.com', // 接口的域名
		changeOrigin: true,
	}
}

let port = 9003
const dev = process.env.NODE_ENV !== 'production'
const app = next({
	dev,
})
const handle = app.getRequestHandler()

app
	.prepare()
	.then(() => {
		const server = express()
		if (dev && devProxy) {
			Object.keys(devProxy).forEach(function (context) {
				server.use(createProxyMiddleware(context, devProxy[context]))
			})
		}

		server.all('*', (req, res) => {
			handle(req, res)
		})

		const servers = server
			.listen(port, err => {
				if (err) {
					throw err
				}
				console.log(`> Ready on http://localhost:${port}`)
				console.log(`> Ready on http://${currentIP}:${port}`)
			})
			.on('error', err => {
				if (err.code === 'EADDRINUSE') {
					servers.close()
					servers.listen(++port)
				}
			})
	})
	.catch(err => {
		console.log('error')
		console.log(err)
	})
