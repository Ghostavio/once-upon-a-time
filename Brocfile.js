/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import("bower_components/ember-localstorage-adapter/localstorage_adapter.js");
app.import({
  development: 'bower_components/lodash/dist/lodash.js',
  production:  'bower_components/lodash/dist/lodash.min.js'
}, {
  'lodash': [
    'default'
  ]
});
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import("bower_components/firebase-simple-login/firebase-simple-login.js");

module.exports = app.toTree();
