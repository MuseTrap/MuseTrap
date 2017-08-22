import React from 'react';
import mocha from 'mocha';
//mocha.setup('bdd');
import chai from 'chai';
var expect = chai.expect;
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ControlPanel from '../client/components/ControlPanel';


describe('<ControlPanel />', () => {
  //should not render share or save buttons if user is not logged in
  it('ControlPanel has 4 buttons if not logged in', () => {
    const wrapper = mount(<ControlPanel loggedIn={false}/>);
    expect(wrapper.find('Button').length).to.equal(4);
  });
  //should render share and save buttons if user is logged in
  it('ControlPanel has 5 buttons if logged in', () => {
    const wrapper = mount(<ControlPanel loggedIn={true}/>);
    expect(wrapper.find('Button').length).to.equal(5);
  });
});

//ControlPanel component
//Hitting each control button should call their respective event handler callback functions
//state of loopButton should start out as false
//state of loopButton should toggle between true and false
//state of playstatus should begin as 'stopped'
//Hitting the play button should change state of playstatus from 'stopped' to 'playing'
//Hitting the pause button should change state of playstatus from 'playing' to 'paused'
//Hitting the play button should change state of playstatus from 'paused' to 'playing'
//Hitting the stop button should should not change the state of playstatus 'stopped'
//Hitting the stop button should change state of playstatus from 'playing' to 'stopped'
//Hitting the stop button should change state of playstatus from 'paused' to 'stopped'
