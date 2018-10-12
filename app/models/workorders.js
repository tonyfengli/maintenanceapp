module.exports = function(sequelize, DataTypes) {
    var Workorders = sequelize.define("Workorders", {
      title: DataTypes.TEXT,
      category: DataTypes.TEXT,
      location: DataTypes.TEXT
    });
   

    Workorders.associate = function(models) {

      // this allows table userfavorite to join with table userinfo in SQL
      //keep in mind this is also called in the other models table
      Workorders.belongsTo(models.Userinfo, {
        foreignKey: {
            allowNull: false
        }
      });
  };
  return Workorders;
};