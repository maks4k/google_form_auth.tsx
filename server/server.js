import express from "express";
import cors from "cors";

const app=express();
app.use(express.json())//для ответов сервера
app.use(cors({origin:"http://localhost:5173",credentials:true}))//указываем на каком порте будет принимать запросы ,надо что бы он мечился с клинетским сервером
app.get("/",(req,resp)=>{
    resp.status(200).json({
        id:2,
        name:"max",
    })
})
app.listen(4000,()=>{
    console.log("server open")
});//указываем на каком порте будет работать сервер

app.post("/signin",(req,resp)=>{
    console.log(req.body);
    
    resp.status(200).json("signin sucsecc"

    )
})