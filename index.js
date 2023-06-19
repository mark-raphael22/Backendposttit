require('dotenv').config();
const express = require('express')
const app =express();
const port= process.env.PORT || 9020
const mongoose = require('mongoose')
const notfound = require('./middleware/notfoundroute')
const userRouter=require('./routes/userRouter');
const cloudinary=require('cloudinary').v2;
const auth=require("./middleware/Authentication")
const storyRouter=require('./routes/storyRouter')
const cors=require('cors');
const fileupload=require('express-fileupload')


cloudinary.config({
    cloud_name: process.env.CLOUD_name,
    api_key: process.env.Cloud_api_key,
    api_secret: process.env.Cloud_api_secret,
});
 


mongoose.set("strictQuery",true);

//middleware
app.use(express.json());
app.use(fileupload({useTempFiles:true}))
app.use(cors());
app.use(express.urlencoded({ extended: true }));


//public route
app.use('/api/v1/',userRouter)

//private routes
app.use('/api/v1/story',auth,storyRouter);

//notfound route
app.use(notfound)


const Startserver=async ()=>{
    try {
        await mongoose.connect(process.env.MON_URI)
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        }) 
    } catch (error) {
        console.log(error);
    }
}    
Startserver();