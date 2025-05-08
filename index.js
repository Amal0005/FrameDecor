const express=require('express')
const session=require("express-session")
const app=express()
const Dotenv=require('dotenv').config()
const db=require('./Config/db')
const path=require("path")
const userRouter=require('./routes/userRouter')

db();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("views",[path.join(__dirname,"views/user"),path.join(__dirname,"views/admin")])

app.use(express.static(path.join(__dirname,"public")))


app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:72*60*60*1000
    }
    
}))
app.use((req,res,next)=>{
    res.set("cache-controll","no-store")
    next()
})
app.use("/",userRouter) 

const PORT = process.env.PORT || 1212;
app.listen(PORT, () => {
    console.log(`Server is running on the port https://localhost:${PORT}`);
});

module.exports=app