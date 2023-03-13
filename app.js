//creando servidor node.js + express usando firebase-admin para manejo de notificaciones
const express = require('express');
const fs = require('fs');
const notifications = require('./notifications.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const port = 3000;

app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.send('Success');
});

app.post('/send-notifications', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    
    const data = {
        topic: "server-notifications",
        title: request.body.title,
        message: request.body.message
    };

    notifications.sendPushToTopic(data);

    response.send(JSON.stringify({ok: true}));
});

app.listen(port, () => {
    console.log(`Server ir started in the port ${port}`);
    console.log(`Access to http://localhost:${port}`);
});