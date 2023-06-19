const mongoose= require('mongoose')
const Schema=mongoose.Schema
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema= new Schema({
    username:{
        type:String,
        required:[true,'please enter a username']
    },
    email:{ 
        type:String,
        required:[true,'please enter a email'],
        unique:true,
         match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"please provide a email"]

    },  
    password:{
        type:String,
        required:[true,'please provide a password'],
        minlenght:[10,'the minimum lenght for password is 10']


    },



},{timestamps:true})

userSchema.pre('save', async function  (next) {
    const salt = await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword =  async function (userpassword) {
    const checked= await bcrypt.compare( userpassword,this.password)
    return checked
}   

userSchema.methods.generateToken=function (){
return jwt.sign({userId:this._id,username:this.username},process.env.JWT_SECRET,{expiresIn:"3d"})
}
 
module.exports = mongoose.model('user',userSchema)