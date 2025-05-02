// const router=require("./router/")

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

module.exports={
    loadHome,
    pageNotFound
}