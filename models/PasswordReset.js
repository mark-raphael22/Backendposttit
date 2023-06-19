const mongoose  = require('mongoose')
const Schema=mongoose.Schema
const passwordSchema = new Schema({

userId:{
    type: String,
  
    

},
createdAt:{
    createdAt:Date
},
uniqueString:{
    uniqueString:String
}

},{timestamps:true})

module.exports= mongoose.model("password",passwordSchema)