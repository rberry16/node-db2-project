// DO YOUR MAGIC
const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');
const md = require('./cars-middleware');

//gets all cars
router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll();
        res.json(cars);
    } catch (err) {
        next(err);
    }
});

//gets car by id
router.get('/:id', md.checkCarId, async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        res.json(car);
    } catch (err) {
        next(err);
    }
});

//posts new car
router.post('/', md.checkCarPayload, md.checkVinNumberValid, md.checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body);
        const car = await Cars.getById(newCar[0]);
        res.json(car);
    } catch (err) {
        next(err);
    }
});

router.use('*', (err, req, res, next) => {//eslint-disable-line
    res.status(err.status).json({
        message: 'There has been an error',
        err: err.message,
        stack: err.stack
    });
});

module.exports = router;