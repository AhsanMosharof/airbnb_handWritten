const multer= require("multer");

                                        //first e data kothay save hobe and ki name e file save hobe ta implement korlam 
const storage= multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, "public/images");    //folder name
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);      //random file name create 
    }
})

                                                 //filter korlam
  const fileFilter=(req, file,cb)=>{
    if (file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/jpg"){
        cb(null,true);
    }else{
        cb(new Error("Invalid file type. Only JPG, JPEG and PNG files are allowed!"), false);
    }
  }

const upload = multer({              //create multer machine , 
                                    // that machine will upload image, storage and filter mechanism pass korlam
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports= upload;