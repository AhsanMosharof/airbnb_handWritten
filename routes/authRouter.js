//core module:

const express= require("express");



//external module:



const authControllers=require("../controllers/authControllers.js");
const {signupValidator}=require("../validator/authValidator.js");
const authRouter= express.Router();






authRouter.get("/signup",authControllers.getSignup);
authRouter.post("/signup",signupValidator,authControllers.postSignup);

authRouter.get("/login",authControllers.getLogin);
authRouter.post("/login",authControllers.postLogin);

authRouter.get("/logout",authControllers.getLogout);
authRouter.post("/logout",authControllers.postLogout);



exports.authRouter=authRouter;