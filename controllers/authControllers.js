
const validator= require("validator");
const {validationResult}=require("express-validator");
const User= require('../models/user');
const bcrypt= require("bcrypt");



exports.getSignup = (req, res, next) => {
    let flashErrors = req.flash('error');
    let errors = [];
    if (flashErrors.length > 0) {
        errors.push({ msg: flashErrors[0] });
    }
    res.render("auth/signup.ejs", {
        isLoggedIn: false,
        errors: errors
    });
};


exports.postSignup = async (req, res, next) => {
    const {firstName,lastName,email,userType,password}=req.body;
    

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array().map(err=>{return err.msg}));
        return res.status(422).render("auth/signup.ejs",{
            errors:errors.array(),
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            userType:req.body.userType,
            isLoggedIn: req.isLoggedIn || false
        });
    }  

    const existingUser= await User.findOne({email:email});
    if (existingUser) {
        req.flash('error','User already exists');
        return res.redirect("/signup");
    }

    //time to create new object and pass values then save and handle callback/catch
    //hashed call, then hased mechanism hashed the pass and return as callback , then callback  password go to for save to DB , save function has own callback , so handle resolve

    

    bcrypt.hash(password,12).then((hashedPassword)=>{
        const user =new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashedPassword,
        userType:userType,
    })

        return user.save();
    })
    .then(()=>{
        req.flash('success','Account created successfully');
        res.redirect("/login"); 
    }).catch(err=>{
        console.log(err);
        req.flash('error','Account not created');
        res.redirect("/signup"); 
    });
    
    
    
    
}   




exports.getLogin = (req, res, next) => {
    let flashErrors = req.flash('error');
    let flashSuccess = req.flash('success');
    
    res.render('auth/login.ejs', {
        isLoggedIn: false,
        errorMessage: flashErrors.length > 0 ? flashErrors[0] : null,
        successMessage: flashSuccess.length > 0 ? flashSuccess[0] : null
    });
}



exports.postLogin = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email:email});
        if(!user){
            req.flash('error','Invalid email or password');
            return res.status(422).render('auth/login.ejs', {
                isLoggedIn: false,
                errorMessage: "Invalid email or password",
                successMessage: null
            });
        }
        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            req.flash('error','Invalid email or password');
            return res.status(422).render('auth/login.ejs', {
                isLoggedIn: false,
                errorMessage: "Invalid email or password",
                successMessage: null
            });
        }
        req.session.isLoggedIn=true;
        req.session.userId=user._id.toString();
        req.session.userType=user.userType;
        req.session.save((err) => {
            if (err) console.log(err);
            res.redirect('/home');
        });
    } catch(err) {
        console.log(err);
        req.flash('error', 'Login failed');
        res.redirect("/login");
    }
};




exports.getLogout = (req, res, next) => {
    res.send('Logout page');
};




exports.postLogout = (req, res, next) => {   
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/home');
    });
};