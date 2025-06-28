import jwt from "jsonwebtoken";

export const generateToken= (userId,res)=>{
    //token creation
    const token=jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d",
    });

    res.cookie("jwt", token, { // jwt is the name of cookie
        maxAge: 7*24*60*60*1000,//in ms
        httpOnly: true, //prevents XSS attacks
        sameSite: "strict" ,//prevents CSRF attack
        secure: process.env.NODE_ENV!=="development",
    });

    return token;
}