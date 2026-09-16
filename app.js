require("dotenv").config();
const express = require("express");
const session =require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path=require("path");
const validator =require("validator");
const flash = require("connect-flash");

//external module
const {storeRouter} = require("./routes/storeRouter.js")
const {hostRouter} = require("./routes/hostRouter.js")
const rootDir= require("./utils/path.js")
const errorControllers=require("./controllers/error.js");
const { authRouter } = require("./routes/authRouter.js");



const { default: mongoose } = require("mongoose");
const app = express();

const DB_PATH = process.env.MONGO_URI;

const store= new MongoDBStore({            // create store object according to MongoDBStore class that will store session information in mongodb instead of memory

    uri:DB_PATH,
    collection:"sessions",

});

// serve image to the frontend
app.use("/images", express.static(path.join(__dirname, "public/images")));



app.use(session({
    secret: process.env.SESSION_SECRET,
     resave:false,
      saveUninitialized:false,
      store:store
}))

app.use(flash());

app.use((req, res, next) => {
    
    // Now checking session instead of raw cookies
    //midleware check
    req.isLoggedIn = req.session ? req.session.isLoggedIn : false;
    res.locals.isLoggedIn = req.isLoggedIn;
    res.locals.user = req.session && req.session.userId 
        ? { _id: req.session.userId, userType: req.session.userType } 
        : null;
    
    res.locals.currentPath = req.path;

    next();
});



app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.use(authRouter);
app.use(storeRouter);

app.use("/host",(req,res,next)=>{
    if(!req.isLoggedIn){
        return res.redirect('/login'); //midleware
    }
    if (req.session.userType !== 'host') {
        return res.redirect('/home'); // unauthorized access
    }
    next();
})
app.use("/host",hostRouter);
app.use(errorControllers.error)


const PORT = 3000;


mongoose.connect(DB_PATH, { family: 4 }).then(()=>{ 

    console.log("Connected to mongodb");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
    
}).catch(err=>{
    console.log("Database connection failed",err);
    
});