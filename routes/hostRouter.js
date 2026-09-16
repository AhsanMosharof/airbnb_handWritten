//core mlodule: 

const express= require("express");
const path=require("path");

//external module:

const hostRouter= express.Router();
const rootDir= require("../utils/path");
const hostControllers=require("../controllers/hostControllers.js");
const upload=require("../utils/fileupload.js");


hostRouter.get("/addHome",hostControllers.getAddHome)
hostRouter.post("/addHome", upload.single("image"), hostControllers.postHomeAdd)
hostRouter.get("/host-home-list",hostControllers.getHostHomeList)

hostRouter.get("/edit-home/:homeId",hostControllers.getEditHome);

hostRouter.post("/edit-home", upload.single("image"), hostControllers.postEditHome)
hostRouter.post("/delete-home",hostControllers.postDeleteHome)





exports.hostRouter=hostRouter;
