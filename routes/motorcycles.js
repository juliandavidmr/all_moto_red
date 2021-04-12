var express = require('express');
const prisma = require('../prisma/client');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const motorcycles = await prisma.motorcycle.findMany({
        where: {
            active: true
        },
        include: {
            MotorcycleLinks: true,
            MotorcycleType: true,
            MotorcycleBrand: true
        },
        orderBy: {
            updatedAt: 'asc',
            viewCount: 'asc'
        },
    });

    res.status(200).json(motorcycles);
});

module.exports = router;
