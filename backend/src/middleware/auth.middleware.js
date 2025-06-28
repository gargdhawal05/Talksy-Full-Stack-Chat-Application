import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute= async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;//Cookie parser allows to parse the cookie
        if(!token){
            return res.status(401).json({message: "Unauthorised- No token Provided"});
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET); // to decode for eg the user id, payload in this case
        
        if(!decoded){
            return res.status(401).json({message: "Unauthorised- Invalid Token "});            
        }

        const user= await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User Not Found "});    
        }
        req.user=user // attaches the user to the req object so that it can be accessed later in router handler
        next()

    }catch(error){
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({message: "INternal Server error"})
    }
}