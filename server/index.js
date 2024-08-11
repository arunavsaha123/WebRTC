const { Server } = require("socket.io");
const io = new Server(8000, {
    cors: true,
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