import { startApp } from '../shared/setup';

const io = startApp('exo4-canvas/client/index.html');

io.on('connection', (socket) => {
    console.log('Un artiste s\'est connecté');

    socket.on('draw', (data) => {
        socket.broadcast.emit('otherDraw', data);
    });

    socket.on('disconnect', () => {
        console.log('Un artiste s\'est déconnecté');
    })
});