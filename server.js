const express = require('express')
const app = express()
const http = require('http').createServer(app)


// const PORT = process.env.PORT || 5000

// http.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';  // Bind to all network interfaces

http.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

// io.on('connection', (socket) => {
//     console.log('Connected...')
//     socket.on('message', (msg) => {
//         socket.broadcast.emit('message', msg)
//     })

// })---------------------------------------

// io.on('connection', (socket) => {
//     // Prompt the user for their name when they connect
//     socket.on('join', (name) => {
//         // Log the connected user's name
//         console.log(`${name} connected`);

//         // Broadcast the connection to all clients
//         socket.broadcast.emit('message', { user: 'Server', text: `${name} has joined the chat` });
//     });

//     // Listen for incoming messages
//     socket.on('message', (msg) => {
//         // Broadcast the message to all clients
//         socket.broadcast.emit('message', msg);
//     });

//     // Listen for disconnection
//     socket.on('disconnect', () => {
//         // Log the disconnected user's name
//         console.log(`${socket.username} disconnected`);
        
//         // Broadcast the disconnection to all clients
//         socket.broadcast.emit('message', { user: 'Server', text: `${socket.username} has left the chat` });
//     });
// });-------------------------------------------
io.on('connection', (socket) => {
    // Listen for the 'join' event to capture the user's name
    socket.on('join', (username) => {
        // Assign the username to the socket
        socket.username = username;

        // Log the connected user's name
        console.log(`${username} connected`);

        // Broadcast the connection to all clients
        // socket.broadcast.emit('message', { user: 'Server', text: ` ${socket.username} has joined the chat` });
    });

    // Listen for incoming messages
    socket.on('message', (msg) => {
        // Broadcast the message to all clients
        socket.broadcast.emit('message', msg);
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
        // Log the disconnected user's name
        console.log(`${socket.username} disconnected`);
    });
});

