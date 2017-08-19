import React from 'react';
import mocha from 'mocha';
//mocha.setup('bdd');
import chai from 'chai';
var expect = chai.expect;
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import Main from '../client/main.jsx';

sinon.spy(Main.prototype, 'loginCB');

//'<NaviBar loggedIn={true} loginCB={()=>{}} creatAcctCB={()=>{}} logoutCB={()=>{}}/>'
describe('<Main />', () => {
  it('calls loginCB', () => {
    const wrapper = shallow(<Main loggedIn={true}/>);
    wrapper.instance().loginCB();
    expect(Main.prototype.loginCB.calledOnce).to.equal(true);
  });
});
