import Ember from 'ember';

export default Ember.Controller.extend({
  name: null,
  needs: ['user'],
  selectedFriends: [],
  actions: {
    createRoom: function() {
      var self = this,
          selectedFriends = this.get('selectedFriends'),
          currentUser = this.get('controllers.user').get('currentUser');
      var newRoom = this.store.createRecord('room', {
        name: this.get('name'),
        user: currentUser
      });
      newRoom.get('members').pushObject(currentUser);
      selectedFriends.forEach(function(i) {
        newRoom.get('members').pushObject(i);
      });
      newRoom.save().then(function(){
        self.setProperties({
          name: null
        });
        self.transitionToRoute('room');
      });
    }
  }
});
