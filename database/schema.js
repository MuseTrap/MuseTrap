var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/musetrap'); //will probably change
var db = mongoose.connection;
db.on('error', console.error);

var Schema = mongoose.Schema;

/** This is the schema for the Users collection in Mongo */
var userSchema = new Schema({
  id: Schema.Types.ObjectId,
  sequences: [sequenceSchema], //according to mongo docs, this is how you define an array of a different schema
  userName: String,
  passWord: String
})
/** This is the schema for the Sequences collection in Mongo */
var sequenceSchema = new Schema ({
  id: Schema.Types.ObjectId,
  userID: Number,
  name: String,
  sequence: Schema.Types.Mixed,  // Mongo does not have an 'object' type, so need to use mixed. has some repercussions to discuss
  bpm: Number
})

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

let updateSequence = function(sequence) {
  db.Sequences.findOneAndUpdate(
    { "name" : sequence.name},
     { $set {"sequence": sequence.sequence}, 
     upsert: true }, function(err, sequence){
       if(err){
          console.log('update err', err);
         }
       }
    );
}

let saveSequence = function(sequence) {
  Sequences.create({
    userID: this.state.user.id, 
    name: '', //not sure we have discussed how to name a sequence yet, possible user prompt to input a name?
    sequence: this.state.sequence,
    bpm: 120
  }, function(err, sequence){
    if(err){
      console.log('save err,' err)
    }
  })
  db.Users.findOneAndUpdate(  //after saving sequence, also need to update the user who created it
    {"name": this.state.user.id }, {$push: {sequences: sequence}},
    function(err, sequence){
      if(err){
        console.log(err);
      }
  })
}

let findSequences = function(user) {
  db.Sequences.find({"userId": user.id}, function(err, sequence){
    if(err){
      console.log('error finding sequences:', err)
    }
  })
}

let Users = mongoose.model('Players', userSchema);

let Sequences = mongoose.model('Sequences', sequenceSchema);

let Samples = mongoose.model('Samples', sampleSchema);

