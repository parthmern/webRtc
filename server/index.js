const express = require("express");

const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server({
    cors : true 
});

const app = express();

app.use(bodyParser.json());


// db
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

// ================================
// sockets related queries
io.on(("connection"),  (socket)=>{
    console.log("connection established done from client side with socket io server =>", socket.id);

    // if(socket.id){
    //     socket.emit("first", "hii");
    // }

    // event "join-room"
    socket.on("join-room", async (data)=>{

        const {roomId, emailId} = data ;
        console.log("join-room by USER data =>", {roomId, emailId}) ;
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId); 

        // creating a group for that socket
        socket.join(roomId);

        socket.broadcast.to(roomId).emit('user-joined', {emailId});

        // in end send res to user
        socket.emit("joined-room", {roomId});

        getAllUsersInRoom(roomId);

    })

    //event "call-user"
    socket.on("call-user", (data)=>{
        const {emailId, offer} = data ;
        const fromEmail = socketToEmailMapping.get(socket.id)
        const socketID = emailToSocketMapping.get(emailId); 
        socket.to(socketID).emit("incoming-call", {from : fromEmail, offer} );
    })

    //event "call-accepted"
    socket.on("call-accepted", (data)=>{
        const {emailId, ans} = data ;
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit("call-accepted", {ans});
    })

})

async function getAllUsersInRoom(roomId){
    const sockets = await io.in(roomId).fetchSockets();
        const socketIds = sockets.map(socket => socket.id);
        console.log(`all users's socket id in room named ${roomId}`, socketIds);
}

// =================================

// http server listen
app.listen(8000, ()=>{
    console.log("http server running on 8000 port");
    console.log("===========================================================");
})

// socket io server listen
io.listen(8001, ()=>{
    console.log("socket io server running on 8001 port");
})
