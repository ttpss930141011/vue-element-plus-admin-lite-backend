const dayjs = require('dayjs')
module.exports = () => dayjs(Date.now()).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')