
const {check} = require("express-validator");


const signupValidator=[

    check("firstName")
    .notEmpty().withMessage("first name is required")
    .isLength({min:3}).withMessage("first name must be at least 3 characters long")
    .trim()
    .matches(/^[A-Za-z]+$/).withMessage("first name must contain only alphabetic characters"),

    check("lastName")
    .notEmpty().withMessage("last name is required")
    .isLength({min:3}).withMessage("last name must be at least 3 characters long")
    .trim()
    .matches(/^[A-Za-z]+$/).withMessage("last name must contain only alphabetic characters"),

    check("email")
    .notEmpty().withMessage("email is required")
    .isEmail().withMessage("email is invalid")
    .trim()
    .normalizeEmail(),

    check("password")
    .notEmpty().withMessage("password is required")
    .isLength({min:6}).withMessage("password must be at least 6 characters long")
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("password must contain at least one lowercase letter, one uppercase letter, one digit and one special character"),

    check("confirmPassword")
    .notEmpty().withMessage("confirm password is required")
    .isLength({min:6}).withMessage("confirm password must be at least 6 characters long")
    .trim()
    .custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error("passwords do not match");
        }
        return true;
    }),

    check("userType")
    .notEmpty().withMessage("user type is required")
    .trim()
    .custom(value => {
        if (value !== "guest" && value !== "host") {
            throw new Error("user type must be guest or host");
        }
        return true;
    }),

    check("terms")
    .notEmpty().withMessage("terms and conditions are required")
    .trim()
    .custom(value => {
        if (value !== "on") {
            throw new Error("terms and conditions must be true");
        }
        return true;
    }),

]

module.exports={signupValidator}
