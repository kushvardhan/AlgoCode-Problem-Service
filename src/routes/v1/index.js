const express = require('express');
const router = express.Router();

const problemRoutes = require('./problem.route');

router.use('/problems', problemRoutes);

module.exports = {
    v1Router: router
};