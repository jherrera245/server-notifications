const admin = require('firebase-admin');

const initFireBase = () => {
    const serviceAccount = require(__dirname + '/keys/usonotificacionespush-firebase-adminsdk-j8xt9-ed796384b9.json');

    admin.initializeApp({
        credential : admin.credential.cert(serviceAccount)
    });
}

//llamada a funcion para inicializar firebase
initFireBase();

const sendPushToOneUser = (notification) => {
    const message = {
        token : notification.token,
        notification: {
            title : notification.title,
            body : notification.message,
        }
    }
    sendMessage(message);
}

const sendPushToTopic = (notification) => {
    const message = {
        topic : notification.topic,
        notification: {
            title : notification.title,
            body : notification.message,
        },
        android: {
            notification: {
              icon: 'stock_ticker_update',
              color: '#7e55c3'
            }
        },
    }

    console.log(message);
    sendMessage(message);
}

//funcion para enviar mensaje
const sendMessage = (message) => {
    admin.messaging().send(message).then(
        response => {
            console.log("Mensaje enviado correctamente:", response);
        }
    ).catch(
        error => {
            console.log("Error al enviar mensaje:", error);
        }
    );
}

//exportando metodos
module.exports = {sendPushToOneUser, sendPushToTopic}