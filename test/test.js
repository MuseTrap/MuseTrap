//var hello = require('../client/main.jsx');
var expect = require('chai').expect;

describe('main component', function() {
  it('should have a method called updatePlay', function() {
    expect(Main.updatePlay).to.be.ok;
  });
});

//describe('helloworld from client', function() {
//  it('should receive helloworld string from client', function() {
//    expect(hello.helloWorld).to.equal('hello world');
//  });
//});

//ControlPanel component
//should not render share or save buttons if user is not logged in
//should render share and save buttons if user is logged in
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


//NaviBar component
//should render login form if user is not logged in
//should render logout button if user is logged in


//server.js
//app.get('/member'..)
//should redirect from '/member' to '/' if user is not logged in

//app.post('/login'..)
//if user does NOT successfully log in from the '/' page, user should still be at the '/' page

//app.post('/createuser'..)
//if user does NOT successfully create user from the '/' page, user should still be at the '/' page

//app.post('/login'..)
//app.get('/member'..)
//if user successfully logs in from the '/' page, user should eventually end up at '/member'

//app.post('/createuser'..)
//app.get('/member'..)
//if user successfully creates user from the '/' page, user should eventually end up at '/member'

//app.post('/logout'..)
//if user successfully logs out from the '/member' page, user should eventually end up at '/'

//app.post('/users'
//app.get('/users'
//if user saves a song sequence, it should be retrieveable

//app.post('/users'
//app.put('/users'
//app.get('/users'
//if user updates an existing song sequence, it should update in the databse and be retrieveable

//app.post('/users'
//app.get('/users/share'
//if user shares an existing song sequence from the /member page,
//  user should be redirected to shareable link localhost:3000/users/username/sequenceName

//app.get('/users/:username/:sequenceName'
//if try to access a bogus user, server should return a 404 error

//app.get('/users/:username/:sequenceName'
//if try to access a song that doesn't exist under a user, server should return a 404 error

//app.get('/users/:username/:sequenceName'
//if try to access a song that isn't, server should return a 404 error
