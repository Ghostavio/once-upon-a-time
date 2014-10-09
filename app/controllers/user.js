import Ember from 'ember';
import ENV from 'once-upon-a-time/config/environment';
var dbRef = new window.Firebase('https://' + ENV.firebase_instance + '.firebaseio.com');

export default Ember.Controller.extend({
  /**
  @property currentUser
  @type {User}
  @default null
  */
  needs: ['friend'],
  currentUser: null,
  permissions: 'email,public_profile,user_friends',

  /**
  Logs a user in with an email in password.
  If no arguments are given attempts to login a currently active session.
  If user does not exist or no user is logged in promise will resolve with null.

  @method login
  @param {String} email The users email
  @param {String} password The users password
  @return {Promise} Returns a promise that resolves with the logged in User
  */
  login: function(email, token) {
    if (email === undefined) {
      return this._loginActiveSession(token);
    } else {
      return this._loginWithCredentials(email, token);
    }
  },

  /**

  @method logout
  @return {Promise} Returns a promise that resolves when the user is logged out.
  */
  logout: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var authClient = new window.FirebaseSimpleLogin(dbRef, function(error, user) {
        Ember.run(function() {
          if (error) {
            reject(error);
          }

          if (!user) {
            self.set('currentUser', null);
            resolve(null);
          }
        });
      });
      authClient.logout();
    });
  },

  /**

  @method createNewUser
  @param {String} email
  @param {String} password
  @return {Promise} Returns a promsie that resolves with newly created user
  */
  createNewUser: function(email) {
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      new window.FirebaseSimpleLogin(dbRef, function(error, user) {
        Ember.run(function() {
          if (error) {
            reject(error);
          }

          if (user) {
            var newUser = self.store.createRecord('user', {
              id: user.id,
              email: email,
              name: user.displayName
            });

            var appUser = newUser.save().then(function(value) {
              self.set('currentUser', value);
              return value;
            });

            resolve(appUser);
          }
        });
      });

      // authClient.createUser(email, token, function(error, user) {
      //   Ember.run(function() {
      //     if (error) {
      //       reject(error);
      //     }

      //     if (user) {
      //       // authClient.login('password', {email: email, password: password});
      //       authClient.login("facebook", {
      //         rememberMe: true,
      //         access_token: token,
      //         scope: self.get('permissions')
      //       });
      //     }
      //   });
      // });
    });

    return promise;
  },

  _loginWithCredentials: function(email, token) {
    var self = this;
    // Setup a promise that creates the window.FirebaseSimpleLogin and resolves
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var authClient = new window.FirebaseSimpleLogin(dbRef, function(error, user) {
        //First Time this fires error and user should be null. If connection successful
        //Second Time will be due to login. In that case we should have user or error
        Ember.run(function() {

          // Handle posible errors.
          if (error && error.code === 'INVALID_USER') {
            resolve(null);
          } else if (error) {
            reject(error);
          }

          // Handle user
          if (user) {
            var appUser = self.store.find('user', user.id).then(function(appUser) {
              self.set('currentUser', appUser);
              return appUser;
            }, function() {
              self.createNewUser(email);
            });
            window.ga('set', '&uid', user.id); // Set the user ID using signed-in user_id.
            self.get('controllers.friend').fetchFriends(appUser);
            resolve(appUser);
          }
        });
      });
      // authClient.login('password', {
      //       email: email,
      //       password: password
      // });
      authClient.login("facebook", {
        rememberMe: true,
        access_token: token,
        scope: self.get('permissions')
      });
    });

    return promise;
  },

  _loginActiveSession: function() {
    var self = this;
    // Setup a promise that creates the window.FirebaseSimpleLogin and resolves
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      new window.FirebaseSimpleLogin(dbRef, function(error, user) {
        // This callback should fire just once if no error or user than not logged in
        Ember.run(function() {
          if (!error && !user) {
            resolve(null);
          }

          if (error) {
            reject(error);
          }

          if (user) {
            var appUser = self.store.find('user', user.id).then(function(value) {
              self.set('currentUser', value);
              self.get('controllers.friend').fetchFriends(value);
              return value;
            });
            // window.FB.api('/me/friends/', function(r) {
            //   r.data.forEach(function(i) {
            //     debugger;
            //     appUser.set('friend',i.id);
            //     appUser.save();
            //     appUser.set('friend', null);
            //   });
            // });

            resolve(appUser);
          }
        });
      });
    });

    return promise;
  }
});
