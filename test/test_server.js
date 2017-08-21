//var hello = require('../client/main.jsx');
//describe('helloworld from client', function() {
//  it('should receive helloworld string from client', function() {
//    expect(hello.helloWorld).to.equal('hello world');
//  });
//});

var mongoose = require('mongoose');
var expect = require('chai').expect;

//supertest is used to preserve login sessions during mocha tests
const request = require('supertest');
var authenticated, agent;

var serverjs = require('../server/server.js');
var app = serverjs.app;
var server;
var db = serverjs.db;
var port = process.env.PORT || 3000;

describe('Close connections', function() {
  it('closes connections', function(done) {
    //close mongoose connections so that the beforeEach and afterEach later on can take care of opening and closing
    mongoose.disconnect(done);
  });
});

describe('', function() {
  var server, db;

  beforeEach(function(done) {

    mongoose.connect('mongodb://localhost/musetraptest'); //will probably change
    var tablenames = ['Users', 'Sequences', 'Samples'];

    db = mongoose.connection;
    db.on('error', () => done('connection error'));
    db.once('open', function() {
      console.log('We are connected to database!');
      //not sure if this is the proper way to reset the database for mocha tests!!!!!!!!
      //the intention is to delete all documents in all collections in mongoose
      db.db.dropDatabase(function() {
        server = app.listen(port, function() {
          authenticated = request(app);
          agent = request.agent(app);
          var host = server.address().address;
          var port = server.address().port;
          console.log('Example app listening at http://%s:%s', host, port);
          done();
        });
      });
    });
  });

  afterEach(function() {
    server.close(() => {
      mongoose.disconnect();
    });
  });

  //Technically these are integration tests. Have not yet been able to stub out the database or database helper functions
  describe('Server tests:', function() {
    //server.js
    //app.get('/member'..)
    //should redirect from '/member' to '/' if user is not logged in
    it('redirects from member to root if not logged in', function(done) {
      this.timeout(5000);
      authenticated.get('/member')
      .expect(302)
      .expect('Location', `/`, done);
    });

    //app.post('/login'..)
    //if user does NOT successfully log in from the '/' page, user should still be at the '/' page
    it('user should be directed back to root page after unsuccessful login', function(done) {
      agent.post(`/login`)
        .send({username: 'bad', password: 'bad'})
        .expect('Location', `/`)
        .expect(302)
        .end(done)
        // .then((res) => {
        //   console.log('res head location', res.header['location']);
        //   expect(res.header['location']).to.equal(`/`);
        //   done();
        // })
        // .catch((err) => {
        //   console.log(err);
        //   return done(err);
        // });
    });

    //app.post('/createuser'..)
    //if user does NOT successfully create user from the '/' page, user should still be at the '/' page
    it('user should still be at root page if cannot create user account', function(done) {
      this.timeout(3000);
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.request.cookies).to.equal('');
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/logout`);
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/`);
          var promise = new Promise(function(resolve, reject) {
            setTimeout(() => {resolve(
              agent.post('/createuser')
                //creating another account under the same username should not be allowed
                .send({username: 'Steve', password: 'pass'})
              )}, 1000
            );
          })
          return promise;
          // return agent.post('/createuser')
          //   //creating another account under the same username should not be allowed
          //   .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //app.post('/login'..)
    //app.get('/member'..)
    //if user successfully logs in from the '/' page, user should eventually end up at '/member'
    it('user should be directed to member page after logging in', function(done) {
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.request.cookies).to.equal('');
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/logout`);
        })
        .then((res) => {
          expect(res.header['location']).to.equal(`/`);
          return agent.post(`/login`)
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.header['location']).to.equal(`/member`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //app.post('/createuser'..)
    //app.get('/member'..)
    //if user successfully creates user from the '/' page, user should eventually end up at '/member'
    it('user should be directed to member page after successful account creation', function(done) {
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.request.cookies).to.equal('');
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.get(`/member`);
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.request.cookies).to.contain('connect.sid');
          done()
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //app.post('/logout'..)
    //if user successfully logs out from the '/member' page, user should eventually end up at '/'
    it('user should be directed to demo page after logging out', function(done) {
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.request.cookies).to.equal('');
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/logout`);
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //this will need an updated schema.js to progress further in the test!!!!!!!!!!!!!!!!!!
    //app.post('/users'
    //app.get('/users'
    //if user saves a song sequence, it should be retrieveable
    it('user should be able to retrieve song sequence that was previously saved', function(done) {
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/users`)
            .send({sequenceObj:
              {
                user: 'Steve',
                sequenceRows:
                [
                  {beat: 'blah', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]}
                ]
              }
            });
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //expect(res.header['location']).to.equal(`/member`);
          return agent.get('/users')
            .send({username: 'Steve'});
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          //expect(res.header['location']).to.equal(`/member`);
          var realData = JSON.parse(res.res.text);
          expect(realData[0].sequenceRows[0].beat).to.equal('blah');
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //this will need an updated schema.js to progress further in the test!!!!!!!!!!!!!!!!!!
    //app.post('/users'
    //app.put('/users'
    //app.get('/users'
    //if user updates an existing song sequence, it should update in the databse and be retrieveable
    it('user should be able to update song sequence that was previously saved', function(done) {
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/users`)
            .send({sequenceObj:
              {
                user: 'Steve',
                sequenceRows:
                [
                  {beat: 'blah', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]}
                ]
              }
            });
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //expect(res.header['location']).to.equal(`/member`);
          return agent.get('/users')
            .send({username: 'Steve'});
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          //expect(res.header['location']).to.equal(`/member`);
          var realData = JSON.parse(res.res.text);
          expect(realData[0].sequenceRows[0].beat).to.equal('blah');
          realData[0].sequenceRows[0].beat = 'blah2';
          return agent.put(`/users`)
            .send({sequenceObj:
              realData[0]
            });
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //expect(res.header['location']).to.equal(`/member`);
          return agent.get('/users')
            .send({username: 'Steve'});
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          //expect(res.header['location']).to.equal(`/member`);
          var realData = JSON.parse(res.res.text);
          expect(realData[0].sequenceRows[0].beat).to.equal('blah2');
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //this will need an updated schema.js to progress further in the test!!!!!!!!!!!!!!!!!!
    //app.post('/users'
    //app.get('/users/share'
    //if user shares an existing song sequence from the /member page,
    //  user should be redirected to shareable link localhost:3000/users/username/sequenceObjID
    it('user should be able to share song sequence that was previously saved', function(done) {
      var sequenceObjID;
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/users`)
            .send({sequenceObj:
              {
                user: 'Steve',
                sequenceRows:
                [
                  {beat: 'blah', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]}
                ]
              }
            });
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //expect(res.header['location']).to.equal(`/member`);
          return agent.get('/users')
            .send({username: 'Steve'});
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          //expect(res.header['location']).to.equal(`/member`);
          var realData = JSON.parse(res.res.text);
          sequenceObjID = realData[0]._id;
          return agent.get('/users/share')
            .send({
              username: 'Steve',
              sequenceObjID: sequenceObjID
            });
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/users/Steve/${sequenceObjID}`);
          return agent.get('/users')
            .send({username: 'Steve'});
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          var realData = JSON.parse(res.res.text);
          expect(realData[0].shareable).to.equal(true);
          //expect(res.header['location']).to.equal(`/users/Steve/${sequenceObjID}`);
          return agent.get(`/users/Steve/${sequenceObjID}`);
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          //expect(res.header['location']).to.equal(`/users/Steve/${sequenceObjID}`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //this will need an updated schema.js to progress further in the test!!!!!!!!!!!!!!!!!!
    //app.get('/users/:username/:sequenceObjID'
    //if try to access a bogus user, server should return a 404 error
    it('if user doesnt exist, should not be able to share their song', function(done) {
      agent.get('/users/Steve/bogusID')
        .then((res) => {
          expect(res.status).to.equal(404);
          //expect(res.header['location']).to.equal(`/users/Steve/bogusID`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //this will need an updated schema.js to progress further in the test!!!!!!!!!!!!!!!!!!
    //app.get('/users/:username/:sequenceObjID'
    //if try to access a song that doesn't exist under a user, server should return a 404 error
    it('if song doesnt exist under user, should not be able to share', function(done) {
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post(`/users`)
            .send({sequenceObj:
              {
                user: 'Steve',
                sequenceRows:
                [
                  {beat: 'blah', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]}
                ]
              }
            });
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //expect(res.header['location']).to.equal(`/member`);
          return agent.get('/users/share')
            .send({
              username: 'Steve',
              sequenceObjID: 'bogusSong'
            });
        })
        .then((res) => {
          expect(res.status).to.equal(500);
          //expect(res.header['location']).to.equal(`/users/Steve/bogusSong`);
          return agent.get('/users/Steve/bogusSong');
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          //expect(res.header['location']).to.equal(`/users/Steve/bogusSong`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

    //this will need an updated schema.js to progress further in the test!!!!!!!!!!!!!!!!!!
    //app.get('/users/:username/:sequenceObjID'
    //if try to access a song that isn't shared, server should return a 404 error
    it('if song isnt shared, should not be able to share', function(done) {
      var sequenceObjID;
      agent.get(`/`)
        .then((res) => {
          expect(res.status).to.equal(200);
          return agent.post('/createuser')
            .send({username: 'Steve', password: 'pass'});
        })
        .then((res) => {
          expect(res.status).to.equal(302);
          expect(res.header['location']).to.equal(`/member`);
          return agent.post('/users')
            .send({sequenceObj:
              {
                user: 'Steve',
                sequenceRows:
                [
                  {beat: 'blah', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]},
                  {beat: 'undefined', row: [0, 0, 0, 0, 0, 0, 0, 0]}
                ]
              }
            });
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          //expect(res.header['location']).to.equal(`/member`);
          return agent.get('/users')
            .send({username: 'Steve'});
        })
        .then((res) => {
          expect(res.status).to.equal(200);
          //expect(res.header['location']).to.equal(`/member`);
          var realData = JSON.parse(res.res.text);
          sequenceObjID = realData[0]._id;
          return agent.get(`/users/Steve/${sequenceObjID}`);
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          //expect(res.header['location']).to.equal(`/users/Steve/mySong`);
          done();
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    });

  });
});