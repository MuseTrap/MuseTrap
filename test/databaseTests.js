var request = require('request');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var axios = require('axios');
var database = require ('../database/schema.js');
var expect = require('chai').expect;
var db = mongoose.connection;


describe('Persistant Mongo Server', function(){
  var dbName = 'musetrap';
  var dbUrl = 'mongodb://localhost:27017/' + dbName;

  it('should have a Users collection', function(){
  	expect(db.collection('Users')).to.exist;
  });

  it('should have a Sequences collection', function(){
  	expect(db.collection('Sequences')).to.exist;
  });

  it('should have a Samples collection', function(){
  	expect(db.collection('Samples')).to.exist;
  });

  it('Should add a new user to the database', function(done){
    
    //after(function(){db.collection('Users').findOneAndRemove({name: {$eq: 'test'}}), function(err){console.log('deleted user')}});

    database.newUser('test', 'muse');

    setTimeout(function(){
  	  db.collection('Users').find().toArray(function(err, results){
  	    expect(results.length).toEqual(1);
  	    expect(results[0].userName).toMatch('test');
  	  })
  	  	db.close();
  	  	done();
    }, 1000);

  });

  xit('Should save a sequence to the database', function(done){
    var testSequence = {
      userID: 0,
      beats: [undefined, undefined, undefined, undefined],
      name: 'sequence', 
      sequence: [[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]],
      bpm: 120,
      shareable: false
    }
  
    database.saveSequence(testSequence);

    setTimeout(function(){
  	  db.collection('Sequences').find().toArray(function(err, results){
  	    expect(results.length).toEqual(1);
  	    expect(results[0].name).toMatch('sequence');
  	  })
  	  	db.close();
  	  	done();
    }, 1000);


  });

  xit('should update the user"s sequences array when savin a sequence', function(done){
     var testSequence = {
      userID: 0,
      beats: [undefined, undefined, undefined, undefined],
      name: 'sequence', 
      sequence: [[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]],
      bpm: 120,
      shareable: false
    }
  
    database.saveSequence(testSequence);
    
    var updatedUsers = [];

      database.Users.find()
      .where('id').equals(testSequence.userID)
      .limit(1)
      .exec(function(err, results){
      	if(err){console.log('err', err)}
        updatedUsers.push(results);
      })

    setTimeout(function(){
    	console.log(updatedUsers);
  	  expect(updatedUsers.length).to.equal(1);
  	  expect(updatedUsers[0].id).toMatch(testSequence.userID);
    }) 	
  })

  

  xit('should update an already existing sequence', function(done){
    database.Sequences.create({
          userID: 0,
          name: 'sequence', 
          beats: [undefined, undefined, undefined, undefined],
          sequence: [[0,0,0,0,0,0,0,0],
    			[0,0,0,0,0,0,0,0],
    			[0,0,0,0,0,0,0,0],
    			[0,0,0,0,0,0,0,0]],
          bpm: 120,
          shareable: false
        }, function(err, result){
  	        if(err){console.log('Error adding sequence: ', err)}
  	        console.log('Saved sequence');          
        });

    database.updateSequence({
      userID: 0,
      name: 'sequence', 
      sequence: [[1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]],
      bpm: 120,
      shareable: false
    });

    setTimeout(function(){
  	  db.collection('Sequences').find().toArray(function(err, results){
  	    expect(results.length).toEqual(1);
  	    expect(results[0].sequence).toMatch([[1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]]);
  	  })
  	  	db.close();
  	  	done();
    }, 1000);


  });


  xit('should retrieve all the sequences for a particular user', function(done){
    var sequences = [] 
    database.findSequences({id:0})
    .then(function(response){
    	response.forEach(function(seq){
    	  sequences.push(seq);
    	})
    });


    setTimeout(function(){
      expect(sequences.length).to.equal(10);
      expect(sequences[0].userID).to.equal(0);
  	  db.close();
  	  done();
    }, 1000)
  });
});