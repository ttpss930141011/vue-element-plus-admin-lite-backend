const { verify } = require("../utils/token.js")
const { checkUserAuth } = require("../models/users.js")
const auth = async (req, res, next) => {
  let token = req.headers["x-token"]
  try {
    const { result, isValid } = verify(token);
    if (!isValid) {
      resingin()
    }
    const { isExit, isAdmin } = await checkUserAuth(result);
    if (isExit && isAdmin) {
      next()
    } else {
      resingin()
    }
  } catch (error) {
    console.log(error)
    resingin()
  }
  function resingin() {
    res.render("resingin", {
      data: JSON.stringify({
        "needReSingin": true,
        message: "需要重新登录"
      })
    })
  }
}


exports.auth = auth