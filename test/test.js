var request = require('supertest');

describe('loading express', function () {
  var server;
  before(function () {
    server = require('../bin/www');
  });
  after(function (done) {
    server.close(done);
  });
  it('responds to /bot/cam', function testSlash(done) {
    request(server)
    .get('/bot/cam')
    .expect(200, done);
  });
});
