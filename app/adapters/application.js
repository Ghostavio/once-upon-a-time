import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: new Firebase('once-upon-a-time.firebaseIO.com')
});

