function ConvertHandler() {
  this.findUnitStart = input => input.search(/[a-z]/gi);
  
  this.getNum = function(input) {
    const unitStartIndex = this.findUnitStart(input);
    let num;
    if (unitStartIndex < 0) {
      num = input;
    }
    if (unitStartIndex > 0) {
      num = input.slice(0, unitStartIndex);
    }
    if (unitStartIndex === 0) {
      return 1;
    }
    if (num.includes('/')) {
      const fraction = num.split('/');
      return fraction.length > 2 ? 'invalid number' : +fraction[0] / +fraction[1];
    }
    return +num;
  };
  
  this.getUnit = function(input) {
    const unitStartIndex = this.findUnitStart(input);
    let unit;
    if (unitStartIndex < 0) {
      return 'invalid unit';
    }
    if (unitStartIndex >= 0) {
      unit = input.slice(unitStartIndex);
    }
    const lowerCaseUnit = unit.toLowerCase();
    const validUnits = ['gal', 'l', 'km', 'mi', 'kg', 'lbs'];
    if (!validUnits.includes(lowerCaseUnit)) {
      return 'invalid unit';
    }
    return lowerCaseUnit === 'l' ? 'L' : lowerCaseUnit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const lowerCaseUnit = initUnit.toLowerCase();
    const convertedUnit = {
      gal: 'L',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return convertedUnit[lowerCaseUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const units = {
      gal: 'gallons',
      km: 'kilometers',
      mi: 'miles',
      lbs: 'pounds',
      kg: 'kilograms',
      L: 'liter'
    };
    return units[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === 'gal') {
      result = initNum * galToL;
    }
    if (initUnit === 'L') {
      result = initNum / galToL;
    }
    if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    }
    if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    } 
    if (initUnit === 'mi') {
      result = initNum *  miToKm;
    }
    if (initUnit === 'km') {
      result = initNum / miToKm;
    }
    return +result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
