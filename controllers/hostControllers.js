

//adding all controllers:

const Home = require('../models/home');
const upload = require('../utils/fileupload');
const fs =require("fs");
const path=require("path");






exports.getAddHome = (req, res, next) => {
    res.render("host/edit_home.ejs", {
        editing: false,
        title: "Add your home",
        isLoggedIn:req.isLoggedIn
    })

}
exports.postHomeAdd = (req, res, next) => {
    const { name, house, price, location, rating } = req.body;
    let imageUrl = "";
    if (req.file) {
        imageUrl = "/images/" + req.file.filename;  //images folder e pic save 
    }
    const newHome = new Home({ name, house, price, location, rating, imageUrl });
    newHome.save().then(() => {

        res.redirect("/host/host-home-list")
    }).catch(err => {
        console.log(err);
    })



}

exports.postEditHome = (req, res, next) => {
    const { id, name, house, price, location, rating } = req.body;


   Home.findById(id).then((home)=>{
    home.name=name;
    home.house=house;
    home.price=price;
    home.location=location;
    home.rating=rating;
    if (req.file) {             //jodi new pic dey , tahole update hobe
       
       
       if(home.imageUrl){
        const oldImage =path.join(__dirname,"../public",home.imageUrl);
        

        fs.unlink(oldImage, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
       }
       
       home.imageUrl = "/images/" + req.file.filename;
    }
    home.save().then((result)=>{
        console.log("Home updated",result);
    }).catch(err=>{
        console.log("Home update failed",err);
    })
    return res.redirect("/host/host-home-list");

   }).catch(err=>{
    console.log("Home not found",err);
    return res.redirect("/host/host-home-list");
   })

}


// host home list will fetch the same data

exports.getHostHomeList = (req, res, next) => {
    Home.find().then((registerdHome) => {                      //fatchall is static var
        res.render('host/host_home_list.ejs', { registerdHome: registerdHome,
        isLoggedIn:req.isLoggedIn
         });
    });
}

exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === "true";

    Home.findById(homeId).then((home) => {
        if (!home) {
            console.log("Home dont found");
            return res.redirect('/host/host-home-list');

        } else {
            console.log(homeId, editing, home);

            res.render("host/edit_home.ejs", {
                title: "Edit your home",
                editing: editing,
                isLoggedIn:req.isLoggedIn,
                home: home
            })
        }

    })

}


exports.postDeleteHome = (req, res, next) => {
    const homeId = req.body.id;
    Home.findByIdAndDelete(homeId).then((home) => {
        // Delete the image file if it exists

        if(home && home.imageUrl){
            const oldImage = path.join(__dirname,"../public",home.imageUrl);
            fs.unlink(oldImage,(err)=>{
                if(err){
                    console.log("Failed to delete image",err)
                }else{
                    console.log("Image deleted successfully");
                }
            })
        }
        
       
        
        console.log("Home deleted");
        return res.redirect("/host/host-home-list");
    }).catch(err => {
        console.log("Home delete failed",err);
        return res.redirect("/host/host-home-list");
    });
    
}
