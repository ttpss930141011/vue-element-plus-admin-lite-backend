var express = require('express');
var router = express.Router();
const {
  addPosition,
  getPositionList,
  getPositionInfoById,
  modifyPositionInfoById,
  deletePositionById

} = require("../controllers/position")
const { auth } = require("../middlewares/auth")

router.post('/add', auth, addPosition);

router.post('/modify', auth, modifyPositionInfoById);

router.get('/list', auth, getPositionList);

router.post('/getPositionInfo', auth, getPositionInfoById);

router.post('/delete', auth, deletePositionById);

module.exports = router;