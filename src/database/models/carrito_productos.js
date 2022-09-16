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
    id_productos: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_productos",
      references: {
        key: "id",
        model: "productos_model"
      }
    },
    id_carrito: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_carrito",
      references: {
        key: "id",
        model: "carrito_model"
      }
    }
  };
  const options = {
    tableName: "carrito_productos",
    comment: "",
    indexes: [{
      name: "id_productos",
      unique: false,
      type: "BTREE",
      fields: ["id_productos"]
    }, {
      name: "id_carrito",
      unique: false,
      type: "BTREE",
      fields: ["id_carrito"]
    }]
  };
  const CarritoProductosModel = sequelize.define("carrito_productos_model", attributes, options);
  return CarritoProductosModel;
};