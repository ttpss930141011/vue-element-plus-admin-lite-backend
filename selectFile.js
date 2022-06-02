/**
 * 主要用于遍历文件夹，将符合条件的文件输出到对应的目标目录
 */


const path = require("path");
const fs = require("fs");

const TARGET_PATH = path.join("/Users/zhaoyanwei/Desktop/finnallyFileCopy/")
// const TARGET_PATH = path.join("/Users/zhaoyanwei/Desktop/finnallyFile/")
const WANTED_SEARCH_PATH = path.join("/Users/zhaoyanwei/Desktop/17通信2班寒假作业补交")

init(WANTED_SEARCH_PATH)

function init(input) {
  const queue = [input];
  clearLogText("社会实践感悟.txt");
  logInText("感悟上交了的名单:" + "\n", "社会实践感悟.txt")
  let curPath;
  while (queue.length) {
    curPath = queue.shift()
    searchDir(curPath, queue)
  }
  console.log("执行完成");
}

function isDir(path) {
  return fs.statSync(path).isDirectory()
}

function isWantedFile(path) {
  if (path.includes("寒假作业——两部分：“大学感悟+社会实践报") || path.includes("大四寒假作业——两部分：“大学感悟+社会实践报告”.doc")) return false
  const stats = fs.statSync(path)
  return stats.isFile() && path.includes("社会实践")
}

function searchDir(dirPath, queue) {
  fs.readdirSync(dirPath).forEach((item) => {
    const curPath = path.join(dirPath, item)
    if (isDir(curPath)) {
      queue.push(curPath)
    } else if (isWantedFile(curPath)) {
      copyToTarget(curPath)
    }
  })
}

function clearLogText(logName = "log.txt") {
  fs.writeFileSync(path.join(__dirname, logName), "", {
    encoding: "utf-8",
  })
}
function logInText(context, logName = "log.txt") {
  fs.writeFileSync(path.join(__dirname, logName), context, {
    encoding: "utf-8",
    flag: "a"
  })
}

function copyToTarget(curPath) {
  const totalSatauation = ["社会实践", "社会实践报告", "《社会实践》报告", "社会实践报告_20210228170055"]
  const {
    filename,
    user,
    finalFIleName
  } = dealWithFileName(curPath, totalSatauation);
  logInText(user + "\n", "社会实践感悟.txt")
  // logInText(filename + "\n", "社会实践感悟.txt")
  const rs = fs.createReadStream(curPath);
  const ws = fs.createWriteStream(path.join(TARGET_PATH, finalFIleName));
  rs.pipe(ws)
}

function dealWithFileName(curPath, totalSatauation) {
  const pathArr = curPath.split("/")
  const filename = pathArr[pathArr.length - 1];
  const user = pathArr[pathArr.length - 2];
  let finalFIleName = totalSatauation.includes(filename.split(".")[0]) ? (user + "_" + filename) : filename
  return { filename, user, totalSatauation, finalFIleName }
}