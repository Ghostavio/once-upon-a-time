import Base from 'simple-auth/authenticators/base';

// the custom authenticator that initiates the authentication process with Facebook
var FacebookAuthenticator = Base.extend({
  restore: function(properties) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(properties.accessToken)) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  authenticate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.getLoginStatus(function(fbResponse) {
        if (fbResponse.status === 'connected') {
          Ember.run(function() {
            resolve({ accessToken: fbResponse.authResponse.accessToken });
          });
        } else if (fbResponse.status === 'not_authorized') {
          reject();
        } else {
          FB.login(function(fbResponse) {
            if (fbResponse.authResponse) {
              Ember.run(function() {
                resolve({ accessToken: fbResponse.authResponse.accessToken });
              });
            } else {
              reject();
            }
          });
        }
      });
    });
  },
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      FB.logout(function(response) {
        Ember.run(resolve);
      });
    });
  }
});

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: function(container, application) {
    // register the Facebook and Google+ authenticators so the session can find them
    container.register('authenticator:facebook', FacebookAuthenticator);
    // container.register('authenticator:googleplus', App.GooglePlusAuthenticator);
  }
};
