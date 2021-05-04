const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/peijun-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

const usersSchema = mongoose.Schema({
  username: String,
  password: String,
});

const Users = mongoose.model('users', usersSchema);

exports.Users = Users;