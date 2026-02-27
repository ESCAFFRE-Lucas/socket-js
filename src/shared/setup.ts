import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

export function startApp(htmlPath: string) {
    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer);

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '..', htmlPath));
    });

    const PORT = 3000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
    });

    return io;
}