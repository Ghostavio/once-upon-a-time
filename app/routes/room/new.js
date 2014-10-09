import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
// import _ from "lodash";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    var userID = this.get('session').content.userID;
    return this.store.find('user', userID);
  },
  renderTemplate: function() {
    this.render('room/new');
    this.render('-new-room-header', {
        outlet:'header'
    });
  }
});
