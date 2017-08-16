var request = require('request');
var mongoClient = require('mongodb').mongoClient;
var expect = require('chai').expect;
var axios = require('axios');
var db = '../database/schema.js';

describe('Persistant Mongo Server', function(){
  var dbName = 'musetrap';
  var dbUrl = 'mongodb://localhost/' + dbName;

  it('Should add a new user to the database', function(done){
    db.newUser('matt', 'muse');

    waits(1000);

    runs(function(){
      mongoClient.connect(dbUrl, function(err, db){
      	var collectionName = 'userSchema';
      	db.createCollection(collectionName, function(err, collection){
      	  collection.find().toArray(function(err, results){
      	  	expect(results.length).toEqual(1);
      	  	expect(results[0].userName).toMatch('matt');

      	  	db.close();
      	  	done();
      	  });
      	});
      });
    });
  });

  it('Should save a sequence to the database', function(done){
  	var testSequence = 	{
		beats: [undefined, undefined, undefined, undefined],
		bpm: 120,
		sequenceRows:

		[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]
		]
	}
    db.saveSequence()
  });

  it('should update an already existing sequence', function(done){

  });

  it('should retrieve all the sequences for a particular user', function(done){
  	
  })
});