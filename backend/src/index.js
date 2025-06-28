import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { server,app} from "./lib/socket.js";

import path from "path"; //built in node
dotenv.config();

const PORT=process.env.PORT;

const __dirname=path.resolve();

app.use(express.json()); //extract json data out of body
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use("/api/auth",authRoutes); // to add base path to router
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV==="production"){ // make frontend available on the same server
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}
server.listen(PORT, "0.0.0.0", () => {
    console.log("server is running on port:" + PORT);
    connectDB();
})
