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
  it('responds to webhooks', function testVerify(done) {
    request(server)
    .get('/bot/webhook')
    .query({'hub.verify_token': 'eleven_eaton_pl'})
    .query({'hub.challenge': 'give_me_this'})
    .expect('give_me_this', done);
  });
});
