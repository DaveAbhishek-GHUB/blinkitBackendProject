const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Index page will be here");
});

module.exports = router;
