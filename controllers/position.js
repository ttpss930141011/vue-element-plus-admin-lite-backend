const {
  add,
  getList,
  getPositionInfo,
  modifyPositionInfo,
  deletePosition
} = require("../models/position.js");
const { Position } = require("../utils/dbTool/db.js");
const dateFormat = require("../utils/format/date")
const addPosition = async (req, res, next) => {
  const {
    companyLogo,
    companyName,
    positionName,
    city,
    pay
  } = req.body;
  let result
  try {
    result = await add(
      {
        companyLogo,
        companyName,
        positionName,
        city,
        pay,
        publishTime: dateFormat()
      }
    )
    console.log(result);
  } catch (error) {
    console.log("添加失败");
  }

  res.set("content-type", "application/json;charset='utf8'")
  res.render("success", {
    data: JSON.stringify({
      message: `职位${positionName}已添加成功`,
      date: JSON.stringify(`${Date.now()}`),
      isSuccess: result
    })
  })
}

const getPositionInfoById = async (req, res, next) => {
  const { _id } = req.body
  res.set("content-type", "application/json;charset='utf8'")
  let result = await getPositionInfo(_id);
  res.render("success", {
    data: JSON.stringify({
      result,
      date: dateFormat(),
      message: JSON.stringify("query information successfully")
    })
  })
}
const getPositionList = async (req, res, next) => {
  res.set("content-type", "application/json;charset='utf8'")
  let list = await getList();
  res.render("success", {
    data: JSON.stringify({
      list,
      date: dateFormat(),
      message: JSON.stringify("get list successfully"),
      total: list ? list.length : 0
    })
  })
}
const modifyPositionInfoById = async (req, res, next) => {
  const { _id, positionInfo } = req.body
  console.log(_id, positionInfo);
  const result = await modifyPositionInfo(_id, positionInfo)
  if (result) {
    res.set("content-type", "application/json;charset='utf8'")
    res.render("success", {
      data: JSON.stringify({
        isSuccess: result,
        date: dateFormat(),
        message: `${positionInfo.positionName} has been modify successfully`,
      })
    })
  } else {
    res.set("content-type", "application/json;charset='utf8'")
    res.render("success", {
      data: JSON.stringify({
        isSuccess: result,
        date: dateFormat(),
        message: `modify failed`,
      })
    })
  }
}
const deletePositionById = async (req, res, next) => {
  const { _id } = req.body;
  const result = await deletePosition(_id)
  if (result) {
    res.set("content-type", "application/json;charset='utf8'")
    res.render("success", {
      data: JSON.stringify({
        isSuccess: result,
        date: dateFormat(),
        message: `has been deleted successfully`,
      })
    })
  } else {
    res.set("content-type", "application/json;charset='utf8'")
    res.render("success", {
      data: JSON.stringify({
        isSuccess: result,
        date: dateFormat(),
        message: `deleted failed`,
      })
    })
  }
}

module.exports = {
  addPosition,
  getPositionList,
  getPositionInfoById,
  modifyPositionInfoById,
  deletePositionById
}