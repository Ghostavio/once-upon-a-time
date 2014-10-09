import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    // TODO: Implement this once findQuery is supported by ember-fire, for now we
    // have to retrive all rooms (yeah, I know) and filter them at the controller
    // var userID = this.get('session').content.userID;
    // return this.store.find('room', {user: userID});
    return this.store.find('room');
  },
  setupController: function (controller, model) {
    this._super(controller, model);

    // well, since we still don't have findQuery, this thing here does the magic of filtering
    // the rooms by user and overwrites the content on the controller, of course this isn't
    // the best solution, as it will be very slow as soon as the number of rooms gets too high
    var userID      = this.get('session').content.userID,
        filterRooms = this.controllerFor('room').get('content.content').filterBy('_data.user.id', userID.toString());

    this.controllerFor('room').set('content', filterRooms);
  },
  renderTemplate: function() {
    this.render('room');
    this.render('-room-header', {
        outlet:'header'
    });
  }
});
