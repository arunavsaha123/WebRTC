const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize Express
const app = express();

const corsOptions = {
    origin: '*', // Replace '*' with your frontend's URL in production
    methods: ['GET', 'POST'], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type'], // Allow only specific headers
};

app.use(cors(corsOptions));

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the HTTP server
const io = new Server(server, {
    cors: corsOptions,
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

const emailToSocketMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
    socket.on("room:join", (data) => {
        const { email, room } = data
        emailToSocketMap.set(email, socket.id)
        socketidToEmailMap.set(socket.id, email)
        socket.join(room)
        io.to(room).emit("user:joined", { email, id: socket.id })
        io.to(socket.id).emit("join:room", data)
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});