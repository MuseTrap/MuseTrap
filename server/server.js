const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const app = express();

//uncomment this when ready to hook up the database
//const db = require('../database/index.js');
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/../public'));
app.use('/static', express.static(__dirname + '/../public'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

//GET /users
//PURPOSE OF THE CLIENT REQUEST TO SERVER: get all sequences for particular user
//Client should send 1 thing to Server...username
//Server should call database helper function DB.getAllSequences(username)
//Database helper function should give array of user's sequences
//Server should send back user's sequences back to Client where Client can render them somewhere

//POST /users
//PURPOSE OF THE CLIENT REQUEST TO SERVER: save particular sequence
//Client should send 3 things to Server...username, sequenceName, sequenceObj contents to be saved
//Server should call database helper function DB.saveSequence(username, sequenceName, sequenceObj)
//Server should respond with 2xx response code back to Client

//PUT /users
//PURPOSE OF THE CLIENT REQUEST TO SERVER: update particular sequence
//Client should send 3 things to Server...username, sequenceName, sequenceObj contents to be updated
//Server should call database helper function DB.updateSequence(username, sequenceName, sequenceObj)
//Server should respond with 200x respond code back to Client

//SHARE??????? The mechanism for sharing is a little vague at the moment!!!!!!!!!!!!!!!
//Client should force user to save the sequence before sharing
//What happens after that?
//Get a link that will give the user a shareable hyperlink?????
//  such as localhost:3000/songs?sequenceName=XXXXXXX ????????????

var port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
