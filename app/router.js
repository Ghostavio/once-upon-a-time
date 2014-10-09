import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OnceUponATimeENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('secret');
  this.route('permission');
  this.route('user');
  this.route('room');
  this.route('room/new');
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    var currentURL = this.get('url');
    if(currentURL !== '/') {
      this.router.currentHandlerInfos[0].handler.controller.set('dontShowHeader', false);
    } else {
      this.router.currentHandlerInfos[0].handler.controller.set('dontShowHeader', true);
    }
    return window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

export default Router;
