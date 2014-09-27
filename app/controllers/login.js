import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this._super();
    // TODO: add this permissions to ENV variables
    var permissions = 'email,public_profile,user_friends',
        permissionsArray = permissions.split(','),
        self = this,
        permissionMapper = function(array) {
          var map = {};
          for(var i = 0, i_l = array.length;i < i_l; i++) {
            var obj = array[i];
            map[obj.permission] = obj.status;
          }
          return map;
        },
        handlePermission = function(permissionsArray) {
          window.FB.api(
            "/me/permissions/",
            function (response) {
              if (response && !response.error) {
                var mappedPermissions = permissionMapper(response.data);
                permissionsArray.forEach(function(i) {
                  if(mappedPermissions[i] !== 'granted') {
                    var newPermission = self.store.createRecord('permission', {
                      name: i
                    });
                    newPermission.save();
                    self.set('invokeDialog', true);
                  }
                });
              }
            }
          );
        };
    handlePermission(permissionsArray);
  },
  invokeDialog: false
});
