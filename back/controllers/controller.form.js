const userModel = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (User) => async (user) => {
    const userr = new User(user)
    try {
        const result = await userr.save();
        if (result) {
            return({
                status:'success',
                message:'user saved successfully',
                payload: result
            });
        }
    } catch (error) {
        return({
            status:'fail',
            message:'user fail to register',
            payload: error
        });
    }
}

signIn = (req, res) => {
    userModel.findOne({
      email: req.body.email,
    }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }
        var token = jwt.sign({ id: user.id }, "fkjdsbhdsfbknzel,sdfsd", {
          expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
          id: user._id,
          email: user.email,
        });
    });
  };





module.exports = (User)=>{
    return ({
        signUp : signUp(User),
        signIn : signIn
        // authenticate: authenticate(User),
        // getUserById : getUserById(User),
        // updateUser: updateUser(User),
        // deleteUser : deleteUser(User)

    });
};