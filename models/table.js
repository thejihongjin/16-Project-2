module.exports = function(sequelize, DataTypes) {
  var Table = sequelize.define("Table", {
    column1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    column2: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Table;
};
