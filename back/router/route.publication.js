const express = require('express');
const router = express.Router();
const pubilcationController = require('../controllers/controller.publication');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')
const publicationModel = require('../model/pubilcation.model');
const fs = require('fs');


router.get('/publications', auth, pubilcationController.getAllPublicqtions);
router.post('/postPublication', auth, multer, pubilcationController.postPublication);
router.delete('/publication/:id', auth, pubilcationController.deletePublication);
router.get('/publication/:id', auth, pubilcationController.getOnePublication);
router.put('/publication/:id', auth, multer, pubilcationController.putPublication)


module.exports = router;