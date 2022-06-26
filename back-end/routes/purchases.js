var express = require('express');
var router = express.Router();
const {
    addPurchase,

} = require('../controllers/purchaseController')

const { 
    middleware
} = require("../middleware/authMiddleware");

router.post('/purchase/:userId/:courseId', addPurchase);

module.exports = router;