
const Home = require('../models/home');
const User = require('../models/user');

exports.getHome = (req, res, next) => {
    Home.find().then((registerdHome) => {                      //fatchall is static var
        res.render('store/home_list.ejs', { isLoggedIn:req.isLoggedIn,registerdHome: registerdHome });
    });
}

exports.getIndex = (req, res, next) => {
    Home.find().then((registerdHome) => {                      //fatchall is static var
        res.render('store/index.ejs', {isLoggedIn:req.isLoggedIn, registerdHome: registerdHome });
    });
}

exports.getBooking = (req, res, next) => {
    res.render("store/booking.ejs", {isLoggedIn:req.isLoggedIn });
}


exports.getFavourite = async (req, res, next) => {


 // populate means only target id can come 
 
    try{
        const userId=req.session.userId;
        const user =await User.findById(userId).populate('favourite');
        const favouriteHomes = user.favourite;
        res.render("store/favourite_list.ejs", {isLoggedIn:req.isLoggedIn, favouriteHomes: favouriteHomes });
    }
    catch(err){
        console.log(err);
        res.redirect("/favourite");
    }
}

exports.postAddToFavourite = async (req, res, next) => {
  

    try{
        const homeId = req.body.homeId;
        const userId=req.session.userId;

        await User.findByIdAndUpdate(userId,{$addToSet:{favourite:homeId}});

        res.redirect("/favourite");
    }
    catch(err){
        console.log(err);
        res.redirect("/favourite");
    }
    


   


  
}

exports.postRemoveFavourite = async (req, res, next) => {
   
    try{
        const homeId = req.body.homeId;
        const userId=req.session.userId;

        await User.findByIdAndUpdate(userId,{$pull:{favourite:homeId}});

        res.redirect("/favourite");
    }
    catch(err){
        console.log(err);
        res.redirect("/favourite");
    }
    
}

exports.getHomeDetails = (req, res, next) => {

    const homeIdfromUrl = req.params.homeId;    //homeId form url

    Home.findById(homeIdfromUrl).then((home) => {

        if (!home) {
            res.redirect("/home");
        } else {
            res.render("store/home_details.ejs", {
                isLoggedIn:req.isLoggedIn,
                home: home
            });
        }

    })


}