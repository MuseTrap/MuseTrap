var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
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
  Promise.promisify(Users.create)({
    sequences: [],
    userName: name,
    passWord: password
  })
  .then()
  .catch()
  // Users.create({
  //   sequences: [],
  //   userName: name,
  //   passWord: password
  // }, function(err, user){
  // 	if(err){console.log('Error adding user: ', err)}
  // 	console.log('Saved user');
  // })
}

let updateSequence = function(sequence) {
  db.collection('Sequences').findOneAndUpdate(
    { "name" : sequence.name},
     { $set: {"sequenceRows": sequence.sequenceRows}}, 
     { upsert: true }, function(err, sequence){
       if(err){
          console.log('update err', err);
         }
       }
    );
}

let saveSequence = function(sequence) {
  Sequences.create({
    userID: sequence.userID,
    name: sequence.name, //not sure we have discussed how to name a sequence yet, possible user prompt to input a name?
    sequenceRows: sequence.sequenceRows,
    beats: sequence.beats,
    bpm: sequence.bpm
  }, function(err, sequence){
    if(err){
      console.log('save err',  err)
    }
  })
  Users.findOneAndUpdate(  //after saving sequence, also need to update the user who created it
    {"id": sequence.userID }, {$push: {sequences: sequence}},
    function(err, sequence){
      if(err){
        console.log(err);
      }
  })
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

module.exports={
  newUser: newUser,
  saveSequence: saveSequence,
  Sequences: Sequences,
  updateSequence: updateSequence,
  findSequences: findSequences,
  Users: Users
}