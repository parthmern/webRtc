const express = require("express");

const bodyParser = require("body-parser");

import { Server } from "socket.io";

const io = new Server({
    cors : true ,
});

const app = express();

app.use(bodyParser.json());

// http server listen
app.listen(8000, ()=>{
    console.log("http server running on 8000 port");
})

// socket io server listen
io.listen(8001, ()=>{
    console.log("socket io server running on 8001 port");
})

// sockets related queries
io.on(("connection"), (socket)=>{
    console.log("connection established done with socket io server =>", socket);
})