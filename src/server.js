const express = require('express');
const bcrypt = require('bcrypt');
const amqp = require('amqplib');
const userModel = require('../src/model/userModel'); 
const db = require('../src/config/db'); 

const app = express();
const port = 3000;

app.use(express.json());

let channel = null;
connectRabbitMQ().then(ch => channel = ch).catch(error => console.error('Erreur de connexion à RabbitMQ', error));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

async function connectRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('user-registrations');
    return channel;
}

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.createUser({
            username,
            email,
            password: hashedPassword
        });

        const message = { username, email };
        channel.sendToQueue('user-registrations', Buffer.from(JSON.stringify(message)));

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l’enregistrement de l’utilisateur', erreur: error.message });
    }
});



app.get('/test', (req, res) => {
    res.send('Le test est réussi');
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

async function shutdown() {
    console.log('Arrêt en douceur du serveur');
    if (channel) {
        await channel.close();
    }
    if (db) {
        await db.end();
    }
    process.exit(0);
}
