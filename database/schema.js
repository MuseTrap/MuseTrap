var mongoose = require('mongoose');
var Promise = require('bluebird');
var mpUtils = require('mongoose-bluebird-utils');
mongoose.connect('mongodb://localhost/musetrap'); //will probably change
var db = mongoose.connection;
db.on('error', console.error);

var Schema = mongoose.Schema;

var sequenceSchema = new Schema ({
  id: {type:Schema.Types.ObjectId, unique: true},
  userID: Number,
  name: {type: String, unique: true, required: true},
  sequenceRows: [[]],  // Mongo does not have an 'object' type, so need to use mixed. has some repercussions to discuss
  bpm: Number,
  beats: [],
  shareable: Boolean
})

/** This is the schema for the Users collection in Mongo */
var userSchema = new Schema({
  id: {type:Schema.Types.ObjectId, unique: true},
  sequences: [sequenceSchema], //according to mongo docs, this is how you define an array of a different schema
  userName: {type: String, unique: true, required: true},
  passWord: String
})
/** This is the schema for the Sequences collection in Mongo */

/** This is the schema for the Samples collection in Mongo */
var sampleSchema = new Schema ({
  id: Schema.Types.ObjectId,
  location: String, //will be a url
  name: String,
  category: String
})


var soundBoardMatrix = {
  beats: [undefined, undefined, undefined, undefined],
  bpm: 120,
  sequenceRows: [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
    ],
}


let newUser = function(name, password) { //function to create a new user- probably will be needed at login page
 var user = new Users (
    {sequences: [],
    userName: name,
    passWord: password
  });
  return user.saveAsync();

let updateUser = function(sequence) {
  var promise = Users.findById(sequence.userID).exec();

  promise.then(function(user) {
    user.sequences.push(sequence);

    return user.save(); 
  })
  .then(function(user) {
    console.log('updated user: ' + user.name);
  })
  .catch(function(err){
    console.log('error:', err);
  });
}
}

let updateSequence = function(sequence) {
  var promise = Sequences.findById(sequence.id).exec();

  promise.then(function(newSequence) {
    newSequence.sequenceRows = sequence.sequenceRows;

    return newSequence.save(); 
  })
  .then(function(newSequence) {
    console.log('updated sequence: ' + newSequence.name);
  })
  .catch(function(err){
    // just need one of these
    console.log('error:', err);
  });
}

let createSequence = function(sequence){
 var newSequence = new Sequences ({
    userID: sequence.userID,
    name: sequence.name, //not sure we have discussed how to name a sequence yet, possible user prompt to input a name?
    sequenceRows: sequence.sequenceRows,
    beats: sequence.beats,
    bpm: sequence.bpm
  });
  return newSequence.saveAsync();
}

let saveSequence = function(sequence) {
  createSequence(sequence)
  .then(updateUser(sequence))
}


let findSequences = function(user) {
  return Sequences.find()
  .where('userID').equals(user.id)
  .limit(10)
  .exec(function(err, results){
    if(err){console.log('find err', err)}
    return results;
  })
}


let Users = mongoose.model('Users', userSchema);

let Sequences = mongoose.model('Sequences', sequenceSchema);

let Samples = mongoose.model('Samples', sampleSchema);

Promise.promisifyAll(Users);
Promise.promisifyAll(Users.prototype);
Promise.promisifyAll(Sequences);
Promise.promisifyAll(Sequences.prototype);

module.exports={
  newUser: newUser,
  saveSequence: saveSequence,
  Sequences: Sequences,
  updateSequence: updateSequence,
  findSequences: findSequences,
  Users: Users
}