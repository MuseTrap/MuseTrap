var mongoose = require('mongoose');
var Promise = require('bluebird');
var mpUtils = require('mongoose-bluebird-utils');
mongoose.connect('mongodb://localhost/musetrap'); 
var db = mongoose.connection;
db.on('error', console.error);

var Schema = mongoose.Schema;

var sequenceSchema = new Schema ({
  id: {type:Schema.Types.ObjectId, unique: true},
  user: String,
  sequenceRows: [{}],
  shareable: Boolean
})


var userSchema = new Schema({
  id: {type:Schema.Types.ObjectId, unique: true}, 
  userName: {type: String, unique: true, required: true},
  passWord: String
})

var sampleSchema = new Schema ({
  id: Schema.Types.ObjectId,
  url: String, 
  name: String
})

var soundBoardMatrix = [
  {beat: undefined, row: [0, 0, 0, 0, 0, 0, 0, 0]},
  {beat: undefined, row: [0, 0, 0, 0, 0, 0, 0, 0]},
  {beat: undefined, row: [0, 0, 0, 0, 0, 0, 0, 0]},
  {beat: undefined, row: [0, 0, 0, 0, 0, 0, 0, 0]}
]

let newUser = function(name, password) { 
 var user = new Users (
    { userName: name,
    passWord: password
  });
  return user.saveAsync();
}

let updateSequence = function(sequence) {
  var promise = Sequences.findById(sequence.id).exec();

  promise.then(function(newSequence) {
    newSequence.sequenceRows = sequence.sequenceRows;

    return newSequence.save(); 
  })
  .then(function(newSequence) {
    console.log('updated sequence: ', newSequence);
    return newSequence;
  })
  .catch(function(err){
    // just need one of these
    console.log('error:', err);
  });
}

let createSequence = function(sequence){
 var newSequence = new Sequences ({
    user: sequence.user,
    sequenceRows: sequence.sequenceRows,
  });
  return newSequence.saveAsync();
}

let saveSequence = function(sequence) {
  return createSequence(sequence)
}

let findSequences = function(user) {
  return Sequences.find()
  .where('user').equals(user)
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

module.exports = {
  newUser: newUser,
  saveSequence: saveSequence,
  Sequences: Sequences,
  updateSequence: updateSequence,
  findSequences: findSequences,
  Users: Users
}