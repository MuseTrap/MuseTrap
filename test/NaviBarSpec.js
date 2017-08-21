import React from 'react';
import mocha from 'mocha';
//mocha.setup('bdd');
import chai from 'chai';
var expect = chai.expect;
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import NaviBar from '../client/components/NaviBar';


//'<NaviBar loggedIn={true} loginCB={()=>{}} creatAcctCB={()=>{}} logoutCB={()=>{}}/>'
describe('<NaviBar />', () => {
  //should render login form if user is not logged in
  it('NaviBar has login form if not logged in', () => {
    var handleClickLoginStub = sinon.spy();
    var handleClickCreatAcctStub = sinon.spy();
    const wrapper = mount(<NaviBar loggedIn={false} loginCB={handleClickLoginStub} creatAcctCB={handleClickCreatAcctStub} logoutCB={()=>{}}/>);
    //expect login form to exist
    expect(wrapper.find('FormControl').length).to.equal(2);
    //expect login button and create account button to exist
    expect(wrapper.find('Button').length).to.equal(2);
    //click login button and expect login handler callback to be called
    wrapper.find('Button').first().simulate('click');
    expect(handleClickLoginStub.calledOnce).to.be.true;
    //click account create button and expect account create callback to be called
    wrapper.find('Button').last().simulate('click');
    expect(handleClickCreatAcctStub.calledOnce).to.be.true;
  });
  //should render logout button if user is logged in
  it('NaviBar has logout button if logged in', () => {
    var handleClickLogoutStub = sinon.spy();
    const wrapper = mount(<NaviBar loggedIn={true} loginCB={()=>{}} creatAcctCB={()=>{}} logoutCB={handleClickLogoutStub}/>);
    expect(wrapper.find('FormControl').length).to.equal(0);
    expect(wrapper.find('Button').length).to.equal(1);
    wrapper.find('Button').first().simulate('click');
    expect(handleClickLogoutStub.calledOnce).to.be.true;
  });
});