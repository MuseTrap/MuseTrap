import React from 'react';
import mocha from 'mocha';
//mocha.setup('bdd');
import chai from 'chai';
var expect = chai.expect;
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import NaviBar from '../client/components/NaviBar';

sinon.spy(NaviBar.prototype, 'componentDidMount');

//'<NaviBar loggedIn={true} loginCB={()=>{}} creatAcctCB={()=>{}} logoutCB={()=>{}}/>'
describe('<NaviBar />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<NaviBar loggedIn={true} loginCB={()=>{}} creatAcctCB={()=>{}} logoutCB={()=>{}}/>);
    expect(NaviBar.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});


//NaviBar component
//should render login form if user is not logged in
//should render logout button if user is logged in