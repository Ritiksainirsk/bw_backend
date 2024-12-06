const express = require('express');
const router = express.Router();
const {
    createComponent,
    getAllComponents,
    getComponent,
    updateComponent,
    deleteComponent
} = require('../controllers/componentController');

router.route('/')
    .post(createComponent)
    .get(getAllComponents);

router.route('/:id')
    .get(getComponent)
    .put(updateComponent)
    .delete(deleteComponent);

module.exports = router;
