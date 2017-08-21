//This is needed to make a HowlerGlobal undefined error during Mocha testing go away
let {HowlerGlobal} = require('howler');
global.HowlerGlobal = HowlerGlobal;