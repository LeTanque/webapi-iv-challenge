const express = require('express');

const routesUsers = require('./routesUser');
const routesPosts = require('./routesPosts');

const router = express.Router();

router.use(express.json());
router.use('/users', routesUsers);
router.use('/posts', routesPosts);


// handles urls beginning with /api.




module.exports = router;

