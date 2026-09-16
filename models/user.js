
const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    
    firstName:{
        type:String,
        required:[true, 'FirstName is required'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true, 'Last Name is required'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email required'],
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'password required'],
    },
    userType:{ 
        type:String,
        required:true,
        enum:['guest','host'],
        default:'guest',
    },

    favourite:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Home",
        unique:true,
        
    }]
})


module.exports=mongoose.model("User",UserSchema);