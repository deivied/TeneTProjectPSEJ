const express = require('express');
const User = require('../model/users.model');
const formController = require('../controllers/controller.form')(User);
const formMiddleware = require('../middlewares/middleware.form');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
    res.json({
        status: "Veuiller changer de verb et URL"
    })
});

// router.get("/login", formController.logPage);

// router.post('/logOut_form', formController.logOut);

router.post('/signUp', formMiddleware.verifEmailOrNum, async (req, res, next) => {
    const saltRound = 10; 
    const user = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        email: req.body.email,
        numero: req.body.numero,
        profil: req.body.profil,
        password: bcrypt.hashSync(req.body.password, 10)
    };
    try {
        const result = await formController.signUp(user);
        res.json(result);
    } catch (error) {
        next(error)
    }
});

router.post('/signIn', formController.signIn);
// router.post('/password_form', formController.changePassword)
// router.get('/profil', auth, formController.profilPage);
// router.get('/userHome', auth, formController.userPage);
// router.get('/password', auth, formController.passwordPage);
// router.post('/profilUser_form', auth, formController.saveProfil);




module.exports = router;


