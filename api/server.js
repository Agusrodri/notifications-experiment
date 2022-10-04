const webpush = require('web-push');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
/**
 * Settings VAPID
 */

//usar vapid Key generada al comienzo (misma que el front)
const vapidKeys = {
    publicKey: "BIuVxvmtGvdwtH1HEw5VxDN2wmZQk2oZRffwgcdFntG8qgQYoKYDhNmZKHWhNx9tw7lCrYl-wBmT-DjkSq-VEuQ",
    privateKey: "7ShsgTCnVKRMGcLZEvWYoomGKkGtdWz3lHWWPFPOdKM"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const enviarNotificacion = (req, res) => {

    //consultar este valor desde la bd - en este caso se agregó aquí para fines prácticos
    const pushSubscription = {
        endpoint: "https://fcm.googleapis.com/fcm/send/ePQ3F61KNd8:APA91bE-t55LuolEdEDiJnbH_Ynik3LQSHLT3zwmzyzCVGRKcr_6-45kY6RZTGFwmfpljwCybutouiTVXTyo9girEB2HYSapL_kr_HqsbI7-5mvDsuNsm-UuJogoEM379-SrIH7P1h4S",
        expirationTime: null,
        keys: {
            p256dh: "BKtMibBezdujqprEQ0OM2AjeLjNTY6F_WgT8QjgkPKAggojybBSbHu6Dv6u8n-u6UZNPSWo-vI3mqWO_s0rgOYQ",
            auth: "WM1bdoDVpoO0uRxd34T0kg"
        }
    };

    const payload = {
        "notification": {
            "title": "kineapp Notification",
            "body": "",
            "vibrate": [100, 50, 100],
            "image": "http://api-kineapp.herokuapp.com/file-id-ejercicio-1.gif",
            /**"data": {
             * "dateOfArrival": Date.now(),
             * "primaryKey": 1
             * } */
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }

    webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
        })

    res.send({ data: 'Se envio subscribete!!' })

}

app.route('/api/enviar').post(enviarNotificacion);


const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at http://localhost:" + httpServer.address().port);
});