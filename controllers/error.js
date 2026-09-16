exports.error=(req, res)=>{
    res.status(404).render("404",{title:"404",
        isLoggedIn:req.isLoggedIn
    });
    console.log(__dirname)
}