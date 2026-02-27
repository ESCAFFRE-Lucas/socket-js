import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let clickCount = 0;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté (ID:', socket.id, ')');

    socket.emit('updateCounter', clickCount);

    socket.on('click', () => {
        clickCount++;
        io.emit('updateCounter', clickCount);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});