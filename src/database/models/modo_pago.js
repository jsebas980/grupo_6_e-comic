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
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombre",
    },
    otrosdetalles: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "otrosdetalles",
    },
  };
  const options = {
    tableName: "modo_pago",
    comment: "",
    timestamps: false,
    indexes: [],
  };

  const ModoPagoModel = sequelize.define(
    "modo_pago_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  ModoPagoModel.associate = function (models) {
    ModoPagoModel.hasMany(models.factura_model, {
      as: "facturamodopago",
      foreignKey: "id_modopago",
    });
  };

  return ModoPagoModel;
};
