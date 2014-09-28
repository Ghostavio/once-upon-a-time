import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'once-upon-a-time', // TODO: loaded via config
  autoprefixer: {
    browsers: ['> 1%', 'last 1 version', 'android 4', 'ios 6']
  },
  Resolver: Resolver
});

loadInitializers(App, 'once-upon-a-time');

export default App;
