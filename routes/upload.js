const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require("path")

let file_name;
const storage = multer.diskStorage({
  //存储的位置
  destination(req, file, cb) {
    const storagePath = path.join(__dirname, "../", "/public/images")
    cb(null, storagePath)
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb) {
    file_name = Date.now() + "_"+ file.originalname
    cb(null, file_name )
  }
})

const upload = multer({ storage })

router.post('/img', upload.single("file"), (req, res) => {
  const url = 'http://localhost:3000/images/' + req.file.filename
  res.render("success", {
    data: JSON.stringify({
      url: url,
      filename: file_name
    })
  })
});



module.exports = router