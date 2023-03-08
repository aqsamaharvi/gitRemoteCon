const express = require("express");
const router = express.Router();
const admin = require("../adminControllers/mainController");
const users = require("../adminControllers/userController");
const orders = require("../adminControllers/orderController");
const finished = require("../adminControllers/finishedOrderController");
const {halls, cattering, vehicles, decore}=require("../adminControllers/catagoryController");

router.get("/admin",(req,res)=>admin(req,res));
router.get("/admin/users",(req,res)=>users(req,res));
router.get("/admin/orders",(req,res)=>orders(req,res));
router.get("/admin/finishedOrders",(req,res)=>finished(req,res));
router.get("/admin/halls", (req,res)=>halls(req,res));
router.get("/admin/cattering", (req,res)=>cattering(req,res));
router.get("/admin/vehicles", (req,res)=>vehicles(req,res));
router.get("/admin/decore", (req,res)=>decore(req,res));

module.exports = router;