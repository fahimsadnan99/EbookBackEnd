

const imgUploader = async(req,res)=>{
  
    try{
        const url = req.protocol + "://" + req.get("host");
        const img = url + "/upload/" + req.file.filename;

       return res.status(201).send(img);

    }catch(e){
        return res.status(500).send("Server Problem")
    }
}


 module.exports = {
    imgUploader
}