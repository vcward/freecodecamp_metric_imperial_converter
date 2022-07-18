const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('GET req to /api/convert: convert a valid input such as 10L', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.string, '10 liter converts to 2.64172 gallons');
        done();
      });
  });

  test('GET req to /api/convert: should convert an invalid input such as 32g', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('GET req to /api/convert: should convert an invalid number such as 3/7.2/4kg', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('GET req to /api/convert: should convert an invalid number and unit such as 3/7.2/4kilomegagram', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('GET req to /api/convert: should convert with no number such as kg', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  });
});
