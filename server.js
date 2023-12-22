const webpush = require('web-push')
const express = require('express')
const app = express()

const vapidKeys = {
	publicKey: 'BCHF3qSYrnH-981aad1iH10JHRqAkH47QHDsXXpbigV5zQjh5gHddh74jlg9tNwIiWTCfl50W6l_0sYmLnjykvA',
	privateKey: 'xsujGGxLHyRcPR0X-XlTSf19Zyj0Er7VUvJsSJBvVaA',
}

webpush.setVapidDetails('mailto:ralfonso@applica.dev', vapidKeys.publicKey, vapidKeys.privateKey)

const enviarNotificacion = (req, res) => {
	console.log('🚀 ~ file: server.js:13 ~ req:', req.body)
	const pushSubscription = {
		endpoint:
			'https://fcm.googleapis.com/fcm/send/dVDPcLrz65k:APA91bEWYEItXX3LHtJU3wF9FygcqcnxrdKGQfpeKI8u5v5bQpYC1fOSLTCDfNfcuOCbBBOzSNHw_qsSe7PfAShhIKk8VlsDG4az0yfG9AhBLXUMBdrGrto23csukDQlwobN8M_onU9f',
		keys: {
			p256dh: 'BMs-CUWCXzKaZizB2cmvr3uKX-DNm_WcF1U1OFG4ZkMatynoA_OoHrK_9ruQtVWaxhBhsRxLarUcWdm110d_Wn0',
			auth: 'T3XbOSbB1G1OLKcCbczRPw',
		},
	}

	const payload = {
		notification: {
			title: '😄😄 Saludos',
			body: 'Subscribete a mi canal de YOUTUBE',
			vibrate: [100, 50, 100],
			actions: [
				{
					action: 'explore',
					title: 'Go to the site',
				},
			],
		},
	}

	webpush
		.sendNotification(pushSubscription, JSON.stringify(payload))
		.then((res) => {
			console.log('Enviado !!')
		})
		.catch((err) => {
			console.log('Error ------------>', err)
		})

	res.send({ data: 'Se envio subscribete!!' })
}

app.route('/api/enviar').post(enviarNotificacion)

const httpServer = app.listen(9000, () => {
	console.log('HTTP Server running at http://localhost:' + httpServer.address().port)
})
