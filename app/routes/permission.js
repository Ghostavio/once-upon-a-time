import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('permission');
  },
  actions: {
    // action to trigger authentication with Facebook
    authenticateWithFacebook: function() {
      this.controller.set('invokeDialog', true);
      this.get('session').authenticate('authenticator:facebook', this);
    }
  }
});
