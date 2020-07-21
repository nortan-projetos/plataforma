const express = require('express');

const Contract = require('../models/contract');
const User = require('../models/user');

const router = express.Router();

router.post('/', (req, res, next) => {
  const contract = new Contract(req.body.contract);
  contract
    .save()
    .then((savedContract) => {
      res.status(201).json({
        message: 'Contrato cadastrado!',
        contract: savedContract,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/update', async (req, res, next) => {
  await Contract.findOneAndUpdate(
    { _id: req.body.contract._id },
    req.body.contract
  );
  return res.status(200).json({
    message: 'Contrato Atualizado!',
  });
});

router.post('/count', (req, res) => {
  Contract.estimatedDocumentCount({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        size: result,
      });
    }
  });
});

router.post('/all', async (req, res) => {
  contracts = await Contract.find({}).populate('author', 'fullName');
  return res.status(200).json(contracts);
});

module.exports = router;
