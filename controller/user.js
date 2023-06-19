
const User=require('../models/auth')
const bcrypt= require('bcrypt')

const errorhandler=require("../utils/errorHandler")


const register= async(req,res)=>{
const {username,email,password}=req.body;
if(!username || !email || !password){
    return res.status(400).json({success:false,mesage:'please provide the valid information'});

}
try {
    const user= await User.create({...req.body})
    const token = user.generateToken()
    res.status(201).json({data:{username:user.username,email:user.email},token})
} catch (error) {
   
   const errors=errorhandler(error)
    res.status(400).json({errors});
    
}

}


const login = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({success:false,mesage:'please provide the valid information'});
}
try {
    const user=await User.findOne({email})
    if(!user){ 
        throw Error('incorrect Email')
    }
    const authenticated= await user.comparePassword(password)     
if(!authenticated){
throw Error('invalid email or  Password')

}
const token = user.generateToken()
res.status(201).json({data:{username:user.username,email:user.email},token})

} catch (error) {
    const errors=errorhandler(error)
    res.status(400).json({errors});
}

}

 
const forgetPassword =async (req,res)=>{
   

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({success:false,mesage:'please provide the valid information'});
}
try {
    //check if email is reg
    const emailExist = await User.findOne({email});
    if (!emailExist){
        return res.status(400).json({success:false,message:'Please Email not found'});
    }
    const salt = await bcrypt.genSalt();
    const hashpasword = await bcrypt.hash(password, salt)
    
    const user =await User.findOneAndUpdate({email}, {password:hashpasword} ,{ new: true, runValidators: true })
     
    
        const token = user.generateToken()
    res.status(200).json({success:true, message:'password updated successfully',data:{user},    })
} catch (error) {
    console.log(error);
    response.json
}
}








module.exports ={
    register,
    login,
    forgetPassword
}