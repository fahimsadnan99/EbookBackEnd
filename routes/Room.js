const express = require('express');
const {CreateRoom, findRoom, allRoomPriceRange,singleRoom} = require("../controller/RoomController")


const Room = express.Router()

Room.route("/room/:id")
        .get(singleRoom)
Room.route("/room")
       .post(CreateRoom)
       .get(allRoomPriceRange)
Room.route("/room/find")
       .post(findRoom)





module.exports = Room