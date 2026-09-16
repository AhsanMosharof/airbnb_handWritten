//core module:

const express= require("express");
const path = require('path')

//external module:

const rootDir=require("../utils/path.js");
const { registerdHome } = require("./hostRouter.js");

const storeControllers=require("../controllers/storeControllers.js");




const storeRouter= express.Router();

const isGuest = (req, res, next) => {
    if (!req.isLoggedIn) {
        return res.redirect('/login');
    }
    if (req.session.userType !== 'guest') {
        return res.redirect('/home');
    }
    next();
};

storeRouter.get("/", storeControllers.getIndex);
storeRouter.get("/home", storeControllers.getHome);
storeRouter.get("/booking", isGuest, storeControllers.getBooking);
storeRouter.get("/favourite", isGuest, storeControllers.getFavourite);
storeRouter.post("/favourite", isGuest, storeControllers.postAddToFavourite);
storeRouter.post("/favourite/remove", isGuest, storeControllers.postRemoveFavourite);
 

storeRouter.get("/homes/:homeId",storeControllers.getHomeDetails);



exports.storeRouter=storeRouter;