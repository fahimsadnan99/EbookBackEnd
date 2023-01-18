const express = require('express');
const {createConfirmRoom,getCaladerData,getRoomByUserId,getRoomByOrderId} = require('../controller/ConfirmRoom')

const ConfrimRoom = express.Router()


ConfrimRoom.route("/confirm")
         .post(createConfirmRoom)

ConfrimRoom.route("/confirm/:id")
         .get(getCaladerData)

ConfrimRoom.route("/user/order/:id")
         .get(getRoomByUserId)
ConfrimRoom.route("/user/room/:id")
         .get(getRoomByOrderId)

module.exports = ConfrimRoom