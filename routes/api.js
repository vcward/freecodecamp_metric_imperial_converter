'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert/:input?').get((req, res) => {
    const { input } = req.query;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid number and unit');
      return;
    }
    if (initNum === 'invalid number' && initUnit !== 'invalid unit') {
      res.send('invalid number');
      return;
    }
    if (initNum !== 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid unit')
      return;
    }
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);  
    if (initNum !== 'invalid number' && initUnit !== 'invalid unit') {
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      });
    }
  });
};
