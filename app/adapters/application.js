import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new window.Firebase('once-upon-a-time.firebaseIO.com')
});

