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
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tiporol",
    },
  };
  const options = {
    tableName: "rol",
    comment: "",
    timestamps: false,
    indexes: [],
  };

  const RolModel = sequelize.define("rol_model", attributes, options);

  //Relaciones con el modelo
  RolModel.associate = function (models) {
    RolModel.hasMany(models.rol_usuario_model, {
      as: "rolusuario",
      foreignKey: "id_rol",
    });
  };

  return RolModel;
};
