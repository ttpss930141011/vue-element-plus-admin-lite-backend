const { verify } = require("../utils/token.js")
const { checkUserAuth } = require("../models/users.js")
const auth = async (req, res, next) => {
  let token = req.headers["x-token"]
  try {
    const { result, isValid } = verify(token);
    if (!isValid) {
      resignin()
    }{
      req.body.account = result;
      next()
    }
    // const { isExit, isAdmin } = await checkUserAuth(result);
    // if (isExit && isAdmin) {
    //   next()
    // } else {
    //   resignin()
    // }
  } catch (error) {
    console.log(error)
    resignin()
  }
  function resignin() {
    res.render("resignin", {
      data: JSON.stringify({
        "needReSignin": true,
        message: "需要重新登录"
      })
    })
  }
}


exports.auth = auth