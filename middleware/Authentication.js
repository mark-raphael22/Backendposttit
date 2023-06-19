
const jwt=require('jsonwebtoken');

const auth = async (req, res,next) =>{
    const authHeaders= req.headers.authorization
    if (!authHeaders || !authHeaders.startsWith('Bearer ')){
        return res.status(401).json({msg:"Authentication failed"})
    }
   //the split help us to pick out words and destructure to an array
    const token = authHeaders.split(' ')[1]
  
    try {
       const payload = jwt.verify(token, process.env.JWT_SECRET)
       //req.user = await Users.findbyId(payload.)
     
       req.user={userId:payload.userId, username:payload.username}
    
       next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({msg:"Auth failed verify token"})
   
    } 
  
}               

module.exports =auth;
