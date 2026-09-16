const mongoose = require("mongoose");


const homeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    house: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },

    // pre hook use korbo 

   

});
//                //command that i excecute in code is "findOneAndDelete"
//  homeSchema.pre('findOneAndDelete', async function (next) {
    
//     const homeId= this.getQuery()._id;                     //find target id (which i want to delete)
//     await Favourite.deleteMany({homeId:homeId});            //delete all the favourite that have same id
//                                             //move to the next middleware

//  }) 



module.exports = mongoose.model("Home", homeSchema)
