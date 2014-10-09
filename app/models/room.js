import DS from 'ember-data';

export default DS.Model.extend({
  user    : DS.belongsTo("user", { async: true }),
  name    : DS.attr('string'),
  members : DS.hasMany("user")
});
