const express = require('express');
const {imgUploader} = require('../controller/imgUploader');
const upload = require("../Multer/multer")

let Routers = express.Router();

 Routers.route("/")
 .post(upload.single("file"),imgUploader)

 module.exports = Routers;