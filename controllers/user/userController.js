const User=require("../../models/userSchema")

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
const signup=async(req,res)=>{
    const{name,mobile,password,email}=req.body
    try {
        const newUser=new User({name,mobile,password,email})
        await newUser.save()
        console.log(newUser)
       return  res.redirect("/signup")
    } catch (error) {
        console.error(error)
        res.status(500).send("server error")
    }

}

module.exports={
    loadHome,
    pageNotFound,
    loadSignup,
    signup
}