var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost:27017/zyw-admin', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。
const db = mongoose.connection;

// 失败提示和连接成功的提示
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("连接成功"));

// 定义Schema 相当于定义了一个集合（表）的字段名
const userSchema = mongoose.Schema({
  account : String,
  username: { type: String, default: '' },
  password: String,
  email: { type: String, default: '' },
  createdTime: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
});

const positionSchema = mongoose.Schema({
  companyLogo: String,
  companyName: String,
  positionName: String,
  city: String,
  pay: String,
  publishTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
});


// 相当于创建了一个类
const Users = mongoose.model('users', userSchema);
const Position = mongoose.model('position', positionSchema);

exports.Users = Users
exports.Position = Position
