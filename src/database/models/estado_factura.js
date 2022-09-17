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
  };
  const options = {
    tableName: "estado_factura",
    comment: "",
    timestamps: false,
    indexes: [],
  };

  const EstadoFacturaModel = sequelize.define(
    "estado_factura_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  EstadoFacturaModel.associate = function (models) {
    EstadoFacturaModel.hasMany(models.factura_model, {
      as: "facturaestado",
      foreignKey: "id_estadofactura",
    });
  };

  return EstadoFacturaModel;
};
