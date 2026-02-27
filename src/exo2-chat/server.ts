import { startApp } from '../shared/setup';

const io = startApp('exo2-chat/client/index.html');

io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`${socket.id} a rejoint la ${room}`);

        socket.to(room).emit('message', `Un utilisateur vient de rejoindre la ${room}.`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        socket.to(room).emit('message', `Un utilisateur vient de quitter la ${room}.`);
    });

    socket.on('chatMessage', (data) => {
        io.to(data.room).emit('message', data.text);
    })

    socket.on('disconnect', () => {
        console.log('Un chatter s\'est déconnecté');
    });
});