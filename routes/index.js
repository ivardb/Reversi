var express = require("express");
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res) {
    res.sendFile("splash.html", {root: "./public"});
<<<<<<< HEAD
});

/* Pressing the 'PLAY' button, returns this page */
router.get("/play", function(req, res) {
    res.sendFile("game.html", {root: "./public"});
});

=======
});

/* Pressing the 'PLAY' button, returns this page */
router.get("/play", function(req, res) {
    res.sendFile("game.html", {root: "./public"});
});

>>>>>>> e6d1f0b763db4f24dd483c795dfc94ed8fb71ac5
module.exports = router;