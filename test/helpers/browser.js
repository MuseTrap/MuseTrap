//Need to install devdependency react-test-renderer to make following warnings during react component testing go away...
//Warning: ReactTestUtils has been moved to react-dom/test-utils. Update references to remove this warning.
//Warning: Shallow renderer has been moved to react-test-renderer/shallow. Update references to remove this warning.

//This file will help Enzyme module test React components
require('babel-register')();

var jsdom = require('jsdom');
const {JSDOM} = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

var exposedProperties = ['window', 'navigator', 'document'];
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

var documentRef = document;