import { startApp } from '../shared/setup';

const io = startApp('exo1-clicker/client/index.html');

let clickCount = 0;

io.on('connection', (socket) => {
    console.log('🟢 Nouveau joueur');

    socket.emit('updateCounter', clickCount);

    socket.on('click', () => {
        clickCount++;
        io.emit('updateCounter', clickCount);
    });
});