const express = require('express');
const Router = express.Router(); 

const { register,login,logout,resetPassword } = require("../controllers/user.controller");
const {upload}=require('../middlewares/multer.middleware')
const  {veriftJwt} = require('../middlewares/auth.middleware');
const {userSchemaValidate}=require('../validators/userSchema.validate')
const {validateSchema}=require('../middlewares/schemaValidate.middleware')

// Router.post("/register",validateSchema(userSchemaValidate),upload.single("avatar"), (register))
Router.post("/register",upload.single("avatar"), (register))
Router.post("/login", login);
Router.post("/logout",veriftJwt, logout);
Router.post("/resetPassword",resetPassword);

module.exports = { userRouter :Router }