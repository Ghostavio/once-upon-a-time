import DS from 'ember-data';
import config from 'once-upon-a-time/config/environment';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('https://' + config.modulePrefix + '.firebaseio.com')
});
