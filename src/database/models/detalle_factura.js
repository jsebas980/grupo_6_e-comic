const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id",
    },
    cantidad: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cantidad",
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precio",
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subtotal",
    },
    oferta: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "oferta",
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descuento",
    },
    id_factura: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_factura",
      references: {
        key: "id",
        model: "factura_model",
      },
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
        model: "productos_model",
      },
    },
  };
  const options = {
    tableName: "detalle_factura",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "id_factura",
        unique: false,
        type: "BTREE",
        fields: ["id_factura"],
      },
      {
        name: "id_productos",
        unique: false,
        type: "BTREE",
        fields: ["id_productos"],
      },
    ],
  };
  const DetalleFacturaModel = sequelize.define(
    "detalle_factura_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  DetalleFacturaModel.associate = function (models) {
    DetalleFacturaModel.belongsTo(models.productos_model, {
      as: "productosdetalle",
      foreignKey: "id_productos",
    });
    DetalleFacturaModel.belongsTo(models.factura_model, {
      as: "factura",
      foreignKey: "id_factura",
    });
  };

  return DetalleFacturaModel;
};
