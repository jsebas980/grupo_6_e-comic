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
    tiporol: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tiporol",
    },
  };
  const options = {
    tableName: "rol_personas",
    comment: "",
    timestamps: false,
    indexes: [],
  };
  const RolPersonasModel = sequelize.define(
    "rol_personas_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  RolPersonasModel.associate = function (models) {
    RolPersonasModel.hasMany(models.productos_personas_model, {
      as: "rolpersonas",
      foreignKey: "id_rol",
    });
  };

  return RolPersonasModel;
};
