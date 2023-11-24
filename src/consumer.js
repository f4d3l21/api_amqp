const amqp = require('amqplib');
const nodemailer = require('nodemailer');

async function startConsumer() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'user-registrations';

    await channel.assertQueue(queue, {
        durable: true
    });

    console.log(`En attente de messages dans la queue: ${queue}`);
    
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const messageContent = JSON.parse(msg.content.toString());
            console.log(`Email à envoyer à l'utilisateur ${messageContent.email}`);
            
            sendEmail(messageContent.email);

            channel.ack(msg);
        }
    });
}

async function sendEmail(email) {
    let transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false
    });

    let mailOptions = {
        from: '"Votre Application" <noreply@votreapp.com>',
        to: email, 
        subject: 'Confirmation d\'inscription',
        text: 'Merci de vous être inscrit !',
        html: '<b>Merci de vous être inscrit !</b>'
    };

    let info = await transporter.sendMail(mailOptions);
    console.log(`Email envoyé: ${info.messageId}`);
}

startConsumer();
