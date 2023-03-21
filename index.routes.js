const express = require("express");
const router = express.Router();
const { Home, About, Contact } = require("../controllers/index.controller");

// define the home page route
router.get("/home", (req, res) => {
  Home(req, res);
});
// define the about route
router.get("/about", (req, res) => {
  About(req, res);
});
router.get("/contactus", (req, res) => {
  Contact(req, res);
});
module.exports = router;
