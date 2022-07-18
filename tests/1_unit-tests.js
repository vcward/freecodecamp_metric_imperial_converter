const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convert handler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('1kg'), 1);
  });

  test('convert handler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.1gal'), 3.1);
  });

  test('convert handler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2gal'), 0.5);
  });
  
  test('convert handler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('3.1/2mi'), 1.55);
  });

  test('should return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/2mi'), 'invalid number');
  });

  test('should default to 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('lbs'), 'lbs');
  });

  test('should return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('in'), 'invalid unit');
  });

  test('should return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('should return the correct spelled out string unit for each valid input unit', function() {
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  suite('Convert Units', function() {
    test('should convert gal to L', function() {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541 , '1 gal is 3.78541 liters');
    });

    test('should convert L to gal', function() {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417 , '1 L is 0.264172 gal');
    });

    test('should convert mi to km', function() {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934 , '1 mi is 1.60934 km');
    });

    test('should convert km to mi', function() {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137 , '1 km is 0.621371 mi');
    });

    test('should convert lbs to kg', function() {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359 , '1 lb is 0.453592 kg');
    });

    test('should convert kg to lbs', function() {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462 , '1 kg is 2.20462 lb');
    });
  });
});