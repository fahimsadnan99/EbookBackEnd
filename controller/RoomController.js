const RoomSchema = require("../model/RoomModel")

const CreateRoom = async(req,res)=>{
    let room = req.body
    room.price = Number(room.price)
    room.bedroom = Number(room.bedroom)
    room.toylet = Number(room.toylet)
    console.log(room);
    try{
        let Room = new RoomSchema(room)
        await Room.save()
        return res.status(201).send({message : "Room Create successfully"})
    }catch(e){
        return res.status(500).send({message : "Room Create failed"})
    }

}


const findRoom = async (req, res) => {
   
  console.log(req.body);
  
    let limit = Number(req.body.limit)
    let page = Number(req.body.page)
    let skipPage =  (page - 1) * limit
 console.log(limit, skipPage,page);
    let arg ={}
    if(req.body.city && (req.body.city.length > 0) ){
      arg.city = req.body.city
    }
     if(req.body.bedroom ){
        arg.bedroom ={
            $in : req.body.bedroom
        } 
    }
    
    if(req.body.classes){
        arg.class = {
            $in : req.body.classes
        }
    }

    if(req.body.price){
        arg.price ={ $gte : req.body.price[0], $lte : req.body.price[1]}
    }
    
    try{
        let roomLength = await (await RoomSchema.find(arg)).length
        
        let findRooms = await RoomSchema.find(arg).limit(limit).skip(skipPage)
        let totalLength = Math.ceil(roomLength/limit)
        return res.status(200).send({room : findRooms, roomLength : totalLength})
    }catch (err){
        return res.status(500).send({message : "Server Problem"})

    }


}


const allRoomPriceRange = async(req,res)=>{
    let roomPrice = await RoomSchema.find()

    let arrayOfPrice = roomPrice.map(item => item.price )
    let maxPrice = Math.max(...arrayOfPrice)
    let minPrice = Math.min(...arrayOfPrice)
    let price = [minPrice, maxPrice]
    try{
        return res.status(200).send(price)
    }catch(err){
        return res.status(500).send({message : "Server Error"})
    }
}


const singleRoom = async(req,res)=>{
    let {id} = req.params
    try{
        let room = await RoomSchema.findById({_id: id})
        return res.status(200).send(room)
    }catch(err ){
        return res.status(500).send({message : "Server Error"})
    }
}



module.exports = {CreateRoom,findRoom, allRoomPriceRange,singleRoom}