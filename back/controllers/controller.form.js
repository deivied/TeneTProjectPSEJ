const User = require('../model/users.model');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');


const signIn = (req, res) => {
    if (req.body.pass === req.body.pass2) {
        bcrypt.hash(req.body.pass, 10).then(hash => {
            const user = new User({
                prenom: req.body.prenom,
                nom: req.body.nom,
                email: req.body.email,
                numero: req.body.tele,
                profil: req.body.profil,
                secret: hash
            });
            user.save().then(
                () => {
                    res.status(201).json({
                        status: 'success',
                        message: 'user saved successfully!',
                        obj: {
                            prenom: req.body.prenom,
                            nom: req.body.nom,
                            email: req.body.email,
                            numero: req.body.tele,
                            profil: req.body.profil,
                            secret: hash
                        }
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        status: 'fail',
                        error: error
                    });
                }
            )
        }).catch(
            (error) => {
                res.status(500).json({
                    status: 'fail',
                    error: error
                });
            }
        )
    } else {
        res.status(400).json({
            status: 'fail',
            message: 'the password and confirm password not match'
        });
    }
}

const logIn = (req, res) => {
    User.findOne({ email: req.body.email, profil: req.body.profil })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.pass, user.secret)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )

                    });
                })
                .catch(error => res.status(500).json({ error: '1' }));
        })
        .catch(error => res.status(500).json({ error: '2' }));
}

const userPage = async (req, res) => {
    let session = req.session;
    if (session.userid) {
        let user = await User.findById(session.userid);
        res.render('user-home', { user });
    }
    else
        res.redirect('/login');
}

const logPage = (req, res) => {
    if (req.session.userid) {
        req.session.destroy();
        res.render('login');
    }
    res.render('login');

}



const logOut = (req, res) => {
    console.log(req.session);
    console.log(res.cookie);
    res.cookie("connect.sid", "", { maxAge: 1 })
    res.redirect('/login')
}

const passwordPage = async (req, res) => {
    let session = req.session;
    if (session.userid) {
        let user = await User.findById(session.userid);
        res.render('password', { user });
    }


    res.redirect('/login');
}

const changePassword = (req, res) => {
    let session = req.session;
    if (req.body.npass === req.body.npassbis) {
        bcrypt.hash(req.body.npass, 10).then(hash => {
            User.findByIdAndUpdate(session.userid, { secret: hash }).then(() => {
                res.status(201).json({
                    status: 'success',
                    message: 'password changed successfully!'
                });
            }
            ).catch(
                (error) => {
                    res.status(400).json({
                        status: 'fail'
                        error: error
                    });
                }
            )
        }).catch(error => {
            res.status(500).json({
                error
            });
        }
        )
    } else {
        res.status(400).json({
            message: 'the password and confirm password not match'
        });
    }
}


const profilPage = async (req, res) => {
    let session = req.session;
    if (session.userid) {
        let user = await User.findById(session.userid);
        res.render('profil', { user });
    }


    res.redirect('/login');
}

const saveProfil = (req, res) => {
    let session = req.session;
    User.findByIdAndUpdate(session.userid, { profiluser: req.body })
        .then(() => {
            res.status(201).json({
                message: 'profil saved successfully!'
            });
        }).catch(
            error => {
                res.status(400).json({
                    error: error
                });
            }
        )
}




module.exports = {
    signIn,
    logIn,
    logOut,
    userPage,
    logPage,
    passwordPage,
    profilPage,
    changePassword,
    saveProfil
}