const express = require("express");
const router = express.Router();
const home = require("../userControllers/homeController");
const aboutus = require("../userControllers/aboutUsController");
const cart = require("../userControllers/cartController");
const feedback = require("../userControllers/feedbackController");
const {halls, cattering, vehicles, decore}=require("../userControllers/catagoryController");
const registration = require("../userControllers/RegController");
const login = require("../userControllers/loginController");
const contactus = require("../userControllers/contactUsController");

router.get("/home",(req, res)=> home (req,res));
router.get("/aboutus",(req,res)=> aboutus (req,res));
router.get("/cart", (req,res)=>cart(req,res));
router.get("/feedback", (req,res)=>feedback(req,res));
router.get("/halls", (req,res)=>halls(req,res));
router.get("/cattering", (req,res)=>cattering(req,res));
router.get("/vehicles", (req,res)=>vehicles(req,res));
router.get("/decore", (req,res)=>decore(req,res));
router.get("/registeration",(req,res)=>registration(req,res));
router.get("/login",(req,res)=>login(req,res));
router.get("/contactus",(req,res)=>contactus(req,res));

module.exports = router;