const { Position } = require("../utils/dbTool/db.js");
const dateFormat = require("../utils/format/date")

/**
 * To signup the position Infomation
 * return has been saved in DB or not
 * @param  { companyLogo, companyName, positionName, city, pay, publishTime }
 * @returns { Boolean }  
 */
const add = async ({
  companyLogo,
  companyName,
  positionName,
  city,
  pay,
  publishTime
}) => {
  // 创建一个实例调用save方法，讲数据存入到数据库中
  const position = new Position({
    companyLogo,
    companyName,
    positionName,
    city,
    pay,
    publishTime
  })
  position.save().then((product) => {
    console.log(product);
    return true
  }).catch((err) => {
    console.log("err" + err);
    return false
  })
}

const getList = async (n = 0) => {
  let list;
  try {
    list = await Position.find({}, { _id: 1, password: 0, __v: 0 }).sort({ _id: -1 }).skip(n)
  } catch (error) {
    return false
  }
  return list
}
const getPositionInfo = async (_id) => {
  let res;
  try {
    res = await Position.findOne({ _id })
  } catch (error) {
    return false
  }
  return res
}
const modifyPositionInfo = async (_id, positionInfo) => new Promise((resolve, _) => {
  Position.findByIdAndUpdate(_id, { $set: { ...positionInfo, updateTime: dateFormat() } }, (err, doc) => {
    if (!err) resolve(true)
    else {
      console.log(doc);
      resolve(false)
    }
  })
})

const deletePosition = async (_id) => new Promise((resolve, _) => {
  Position.findByIdAndRemove(_id, (err, doc) => {
    if (!err) resolve(true)
    else {
      console.log(doc);
      resolve(false)
    }
  })
})

module.exports = {
  add,
  getList,
  getPositionInfo,
  modifyPositionInfo,
  deletePosition
}
