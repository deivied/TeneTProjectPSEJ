const User = require('../model/users.model')

verifEmailOrNum = (req, res, next) => {
    // Username
    User.findOne({
      numero: req.body.numero
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! this phone number is already in use!" });
        return;
      }
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
        next();
      });
    });
  };



module.exports = {
    verifEmailOrNum
}