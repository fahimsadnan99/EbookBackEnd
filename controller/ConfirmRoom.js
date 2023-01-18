const ConfirmRoom  = require("../model/ConfirmRoom")
const jwt_decode = require("jwt-decode");

const stripe = require("stripe")("sk_test_51MRajQSJQiFGVoj99g8Nk7L1LIlpMrs6ehLZ6strzS1XN1TJhry3HussNniYeBwzduZ0zsq2kYXV8U5pwRldfjuz00GLBPqBTb");
 const createConfirmRoom = async (req,res)=>{
    console.log(req.body);
    const {value,token} = req.body
    console.log(value, token)
    
 let {roomId,date,tokens,phone,address,amount,name} = req.body.value;
    let {_id} = jwt_decode(tokens);
  
        let confirm = await ConfirmRoom({
            roomId: roomId,
            date: date,
            userId : _id,
            phone : phone,
            address : address,
            amount : amount,
            name : name,
            email : token.email

        })

        await confirm.save()

   return stripe.customers.create({
        email: token.email,
        name: value.name,
       
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: value.amount, // Charging Rs 25
          description: value.price,
          currency: "DOLLAR",
          quality : value.quality
        //   customer: customer.id,
        });
      })
      .then((charge) => {
        console.log("charge",charge)
        res.send({
          success: true,
          message: "Payment Successfull",
          charge: charge
        }); // If no error occurs
      })
      .catch((err) => {
        res.send(err); // If some error occurs
      })

  

}


const getCaladerData = async (req,res)=>{
    let {id} = req.params
    try{
        let data = await ConfirmRoom.find({roomId: id})
        let dates = []
         data?.map(item => dates.push(...item.date))

        return res.status(200).send(dates)
    }catch(err){
        return res.status(500).send({message : "Server error"})
    }
}


const getRoomByUserId = async(req,res)=>{
    let {id} = req.params
    try{
        let room = await ConfirmRoom.find({userId: id}).populate("roomId")
        return res.status(200).send(room)
    }catch(err ){
        return res.status(500).send({message : "Server Error"})
    }
}


const getRoomByOrderId = async(req,res)=>{
    let {id} = req.params
    try{
        let room = await ConfirmRoom.findById({_id: id}).populate("roomId")
        return res.status(200).send(room)
    }catch(err ){
        return res.status(500).send({message : "Server Error"})
    }
}
module.exports = {createConfirmRoom,getCaladerData,getRoomByUserId,getRoomByOrderId}
