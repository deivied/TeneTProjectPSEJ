const Publication = require('../model/pubilcation.model');
const User = require('../model/users.model');

const getAllPublicqtions = async (req, res) => {
    Publication.find().then(publications => {
        res.status(201).json({
            status: 'succes',
            publications: publications
        })
    }).catch(error => {
        res.status(500).json({
            status: 'error',
            error: error
        })
    });
}

const postPublication = (req, res) => {
    const publication = {
        publication: req.body.publication,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    }
    Publication.create(publication).then((pubilcation) => {
        res.status(201).json({
            status: 'succes publication',
            body: pubilcation
        })
    }).catch(error => {
        res.status(500).json({
            status: 'error',
            error: error
        })
    })
}

const deletePublication = (req, res) => {
    Publication.findOne({ _id: req.params.id }).then(
        (publication) => {
            if (!publication) {
                res.status(404).json({
                    error: 'Publication nexiste pas'
                });
            }
            if (publication.userId !== req.auth.userId) {
                res.status(400).json({
                    error: 'Unauthorized request!'
                });
            }
            if (publication.userId === req.auth.userId) {
                publication.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }).catch(
                        (error) => {
                            res.status(400).json({
                                error: error
                            });
                        }
                    );
            }

        }
    )
};

const getOnePublication = (req, res) => {
    Publication.findOne({ _id: req.params.id }).then(
        (publication) => {
            if (!publication) {
                res.status(404).json({
                    error: 'Publication nexiste pas'
                });
            }
            res.status(200).json({
                status: 'success',
                publication: publication
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


const putPublication = (req, res) => {
    const publication = new Publication({
        _id: req.params.id,
        publication: req.body.publication,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    Publication.updateOne({ _id: req.params.id }, publication).then(
        (publication) => {
            res.status(201).json({
                message: 'publication updated successfully!',
                publication: publication
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


module.exports = {
    getAllPublicqtions,
    postPublication,
    deletePublication,
    getOnePublication,
    putPublication
}