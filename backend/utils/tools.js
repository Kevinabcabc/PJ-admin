const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

exports.hash = (myPlaintextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, 10, (err, hash) => {
      if (err)
        reject(err);
      resolve(hash);
    })
  });
}

exports.compare = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      resolve(result);
    });
  })
}

exports.sign = () => {
  const privateKey = fs.readFileSync(path.join(__dirname, '../'))
}