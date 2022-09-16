const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    nombrecategoria: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombrecategoria"
    }
  };
  const options = {
    tableName: "categoria",
    comment: "",
    indexes: []
  };
  const CategoriaModel = sequelize.define("categoria_model", attributes, options);
  return CategoriaModel;
};