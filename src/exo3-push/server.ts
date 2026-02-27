import { startApp } from '../shared/setup';

const io = startApp('exo3-push/client/index.html');

io.on('connection', (socket) => {
    socket.on('newOrder', (username) => {
        io.emit('orderNotification', {
            username: username,
        })
    })
});