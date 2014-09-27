import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OnceUponATimeENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('secret');
  this.route('permission');
});

export default Router;
