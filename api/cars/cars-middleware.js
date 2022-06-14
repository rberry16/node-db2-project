const vinValidator = require('vin-validator');
const db = require('../../data/db-config');

const checkCarId = async (req, res, next) => {
  const isExisting = await db('cars').where('id', req.params.id).first();
  if (!isExisting || isExisting === undefined || isExisting === null) {
    res.status(404).json({message: `car with id ${req.params.id} is not found`});
  } else {
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin || req.body.vin === undefined) {
    res.status(400).json({message: 'vin is missing'});
  } else if (!req.body.make || req.body.make === undefined) {
    res.status(400).json({message: 'make is missing'});
  } else if (!req.body.model || req.body.model === undefined) {
    res.status(400).json({message: 'model is missing'});
  } else if (!req.body.mileage || req.body.mileage === undefined) {
    res.status(400).json({message: 'mileage is missing'});
  } else {
    next();
  }
};

const checkVinNumberValid = async (req, res, next) => {
  const isValid = await vinValidator.validate(req.body.vin);
  if (!isValid) {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`});
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const isExisting = await db('cars').where('vin', req.body.vin);
  if (isExisting) {
    res.status(400).json({message: `vin ${req.body.vin} already exists`});
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
