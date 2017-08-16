var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musetrap'); //will probably change
var db = mongoose.connection;
db.on('error', console.error);

var Schema = mongoose.Schema;

var sequenceSchema = new Schema ({
  id: Schema.Types.ObjectId,
  userID: Number,
  name: String,
  sequence: Schema.Types.Mixed,  // Mongo does not have an 'object' type, so need to use mixed. has some repercussions to discuss
  bpm: Number,
  shareable: Boolean
})

/** This is the schema for the Users collection in Mongo */
var userSchema = new Schema({
  id: Schema.Types.ObjectId,
  sequences: [sequenceSchema], //according to mongo docs, this is how you define an array of a different schema
  userName: String,
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
  beat1: {
  	sound: null,
  	row: [0, 0, 0, 0, 0, 0, 0, 0]
  },
  beat2: {
  	sound: null,
  	row: [0, 0, 0, 0, 0, 0, 0, 0]
  },
  beat3: {
  	sound: null,
  	row: [0, 0, 0, 0, 0, 0, 0, 0]
  },
  bpm: 0 //default?
}

let newUser = function(name, password) { //function to create a new user- probably will be needed at login page
  Users.create({
    sequences: [],
    userName: name,
    passWord: password
  }, function(err, user){
  	if(err){console.log('Error adding user: ', err)}
  	console.log('Saved user');
  })
}

let saveSequence = function() {
  Sequences.create({
    userID: req.session.user,
    name: '', //not sure we have discussed how to name a sequence yet
    sequence: this.state.sequence,
    bpm: 120,
    shareable: false
  })
}

let Users = mongoose.model('Users', userSchema);

let Sequences = mongoose.model('Sequences', sequenceSchema);

let Samples = mongoose.model('Samples', sampleSchema);

module.exports={
  newUser: newUser,
  saveSequence: saveSequence,
  Sequences: Sequences
}