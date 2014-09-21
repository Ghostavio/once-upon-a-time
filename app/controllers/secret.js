import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    publish: function() {
      var newPost = this.store.createRecord('post', {
        text: this.get('new_message')
      });
      newPost.save();
      this.set('new_message', ''); // resets the view to empty string (optional)
    }
  }
});
