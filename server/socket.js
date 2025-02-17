import { Server as socketIo } from 'socket.io';
import userModel from './Database/models/user.model.js';
import captainModel from './Database/models/captain.model.js';



// Here we are connecting both the user and the captain to the socket server and storing the socketId
// of both in the database
let io;

function initializeSocket(server) {
    io = new socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (!userId || !userType) {
                return socket.emit('error', { message: 'Invalid join data' });
            }

            try {
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else {
                    socket.emit('error', { message: 'Invalid user type' });
                }
            } catch (error) {
                console.error(error.message);
                socket.emit('error', { message: 'Error updating socket ID' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!userId || !location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng,
                    },
                });
            } catch (error) {
                console.error(error.message);
                socket.emit('error', { message: 'Error updating location' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (!messageObject || !messageObject.event || !messageObject.data) {
        console.error('Invalid messageObject provided.');
        return;
    }

    console.log('Sending message:', messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io not initialized.');
    }
};

export { initializeSocket, sendMessageToSocketId };
