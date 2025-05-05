const User=require("../../models/userSchema")
const nodemailer=require("nodemailer")
const env=require("dotenv")

const pageNotFound=async(req,res)=>{
    try {
        res.render("pageNotFound")
    } catch (error) {
        res.redirect("/pageNotFound")
    }
}
const loadHome=async(req,res)=>{
    try {
        return res.render("Home")
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
}
const loadSignup=async(req,res)=>{
    try {
        res.render("signup")
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
// const signup=async(req,res)=>{
//     const{name,mobile,password,email}=req.body
//     try {
//         const newUser=new User({name,mobile,password,email})
//         await newUser.save()
//         console.log(newUser)
//        return  res.redirect("/signup")
//     } catch (error) {
//         console.error(error)
//         res.status(500).send("server error")
//     }

// }
function generateOtp(){
    return Math.floor(100000+Math.random()*900000).toString()
}
async function sendVerificationEmail(email,otp){
    try {
        const transporter=nodemailer.createTransport({
            service:"gmail",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                pass:process.env.NODEMAILER_PASSWORD
            }
        })

         const info=await transporter.sendMail({
            from:process.env.NODEMAILER_EMAIL,
                to: email,
                subject:"verify your Account",
                text:`Your otp is ${otp}`,
                html:`<b>Your otp ${otp}</b>`,
         })
         return info.accepted.length>0

    } catch (error) {
        console.error("error sending email",error);
        return false;
    }
}

const signup=async(req,res)=>{
    const{email,password,cPassword}=req.body
    try {
        if(password!==cPassword){
            res.render("signup",{message:"Passwords are not matching"})
        }
        const findUser=await User.findOne({email:req.body.email})
        if(findUser){
            res.render("signup",{message:"User already exist"})
        }
        const otp=generateOtp()
        const emailSent=await sendVerificationEmail(email,otp)
        if(!emailSent){
            return res.json("email error")
        }
        req.session.userOtp=otp;
        req.session.userData={email,password}
        // res.render("verify-otp");
        console.log('otp send',otp)

    } catch (error) {
        console.error("signup error",error);
        res.redirect("/pageNotFound")
    }
}

module.exports={
    loadHome,
    pageNotFound,
    loadSignup,
    signup
}