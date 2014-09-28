import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OnceUponATimeENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('secret');
  this.route('permission');
  this.route('user');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    return window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

export default Router;
