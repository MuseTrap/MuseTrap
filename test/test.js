var hello = require('../client/main.js');
var expect = require('chai').expect;

describe('helloworld from client', function() {
  it('should receive helloworld string from client', function() {
    expect(hello.helloWorld).to.equal('hello world');
  });
});