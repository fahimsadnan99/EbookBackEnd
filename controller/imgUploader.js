const Cloudinary = require("../utils/Cloudinary")
  // const opts = {
  //   overwrite: true,
  //   invalidate: true,
  //   resource_type: "auto",
  // };


  // const uploadImage = (image) => {
  //   //imgage = > base64
  //   return new Promise((resolve, reject) => {
  //     cloudinary.uploader.upload(image, opts, (error, result) => {
  //       if (result && result.secure_url) {
  //         // console.log(result.secure_url);
  //         return resolve(result.secure_url);
  //       }
  //       // console.log(error.message);
  //       return reject({ message: error.message });
  //     });
  //   });
  // };


const imgUploader = async(req,res)=>{

  try{
    let result = await Cloudinary.uploader.upload(req.body.img,{
      folder : "EasyBooking"
    })
  
    return res.status(200).send(result.secure_url)
  }catch(err){
    return res.status(500).send({message  : "Server error"})
  }


}


 module.exports = {
    imgUploader
}