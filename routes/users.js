var express = require('express');
var router = express.Router();
const {
  userRegister,
  userLogin,
  userList,
  modifyUserInfo,
  deleteUser,
  userSingout,
  getUserAuth,
  setEmail
} = require("../controllers/user.js")
const { auth } = require("../middlewares/auth")

router.post('/register', userRegister);

router.post('/setEmail',auth , setEmail);

router.post('/login', userLogin);

router.get('/list', auth, userList);

router.post('/modify', auth, modifyUserInfo);

router.post('/delete', auth, deleteUser);

router.post('/singout', userSingout);

router.get('/getUserInfo', auth, getUserAuth);

module.exports = router;