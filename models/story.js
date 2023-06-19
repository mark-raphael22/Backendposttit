const mongoose = require('mongoose');
 

const storySchema= new  mongoose.Schema ({
title:{
    type:String,
    unique:true,
    required:[true,'please provide a title']
},
tags:{
    type:String,
    required:[true,'please provide a tag name']
},
paragraph:{
    type:String,
    required:[true,'please provide a description']
},
image:{
    type:String,
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:[true,'please provide a user']
}


    

},{timestamps:true})


module.exports = mongoose.model('story',storySchema);