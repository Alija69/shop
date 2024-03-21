const express = require('express');
const itemRoutes = require('./shop/routes')

const router = express.Router();

// status
router.get('/', (req, res) => res.send('OKAY'));

router.use('/shop', itemRoutes);

module.exports = router;
