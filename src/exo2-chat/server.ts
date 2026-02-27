import { startApp } from '../shared/setup';

const io = startApp('exo2-chat/client/index.html');

type ChatMessage = { senderId: string; text: string };
let messageMap = new Map<string, ChatMessage[]>();

io.on('connection', (socket) => {

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`${socket.id} a rejoint la ${room}`);

        const roomHistory = messageMap.get(room) || [];
        socket.emit('messageHistory', roomHistory);

        socket.to(room).emit('message', `Un utilisateur vient de rejoindre la ${room}.`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        socket.to(room).emit('message', `Un utilisateur vient de quitter la ${room}.`);
    });

    socket.on('chatMessage', (data) => {
        if (!messageMap.has(data.room)) {
            messageMap.set(data.room, []);
        }

        const newMessage = {
            senderId: socket.id,
            text: data.message
        };

        messageMap.get(data.room)!.push(newMessage);

        socket.to(data.room).emit('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Un chatter s\'est déconnecté');
    });
});