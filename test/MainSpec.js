import React from 'react';
import mocha from 'mocha';
//mocha.setup('bdd');
import chai from 'chai';
var expect = chai.expect;
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import Main from '../client/main.jsx';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//var sandbox = sinon.sandbox.create();
var mock;
//sinon.spy(Main.prototype, 'loginCB');

xdescribe('<Main />', () => {
  //var xhr, requests;
  beforeEach(function() {
    //xhr = sinon.useFakeXMLHttpRequest();

    //gather requests
    //requests = [];
    //xhr.onCreate = function(xhr) {
    //    requests.push(xhr);
    //};

    mock = new MockAdapter(axios);

  });

  afterEach(function() {
    //requests = [];
    //xhr.restore();
    //sandbox.restore();

    mock.restore();
  });

  it('Main calls loginCB', () => {
    var spy = sinon.spy(Main.prototype, 'loginCB')
    mock.onPost('/login').reply(302, 'dummy' );
    //var stub = sinon.stub(window, 'redirect');
    //sandbox.stub(axios, 'post').returns(Promise.resolve(true));

    const wrapper = shallow(<Main loggedIn={false}/>);
    wrapper.instance().loginCB('Steve', 'pass');

    //expect(requests.length).to.equal(1);
    //stub.calledWith('/member', true);
    //console.log('window location is ', window.location.toString());
    //expect(window.location.pathname).to.equal('/member');

    //expect(spy.threw()).to.be.true;
    //expect(Main.prototype.loginCB).to.throw('TypeError');
    expect(Main.prototype.loginCB.calledOnce).to.equal(true);
  });
});
