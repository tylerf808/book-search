const router = require('express').Router();
const userRoutes = require('./userApi');

router.use('/users', userRoutes);

module.exports = router;