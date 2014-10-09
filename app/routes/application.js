import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  init: function() {
    this._super();
    if(this.get('session').isAuthenticated) {
      var self = this,
          token = this.get('session').content.accessToken;
      window.FB.api('/me/', function(r) { self.controllerFor('user').login(r.email, token); });
    }
  }
});
