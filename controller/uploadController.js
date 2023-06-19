const cloudinary =require('cloudinary').v2
const fs=require('fs')

const uploadImage= async (req,res)=>{
   
const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,
    {
        use_filename:true,
        folder:"ProductImages", 
    }
    );
    req.body.image=result.secure_url;
    console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath); 
  return res.status(200).json({img:{ src:result.secure_url }})
} 

module.exports= uploadImage