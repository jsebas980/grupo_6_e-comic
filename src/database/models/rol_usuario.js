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
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "fecha",
    },
    id_usuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_usuario",
      references: {
        key: "id",
        model: "usuario_model",
      },
    },
    id_rol: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_rol",
      references: {
        key: "id",
        model: "rol_model",
      },
    },
  };
  const options = {
    tableName: "rol_usuario",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "id_usuario",
        unique: false,
        type: "BTREE",
        fields: ["id_usuario"],
      },
      {
        name: "id_rol",
        unique: false,
        type: "BTREE",
        fields: ["id_rol"],
      },
    ],
  };

  const RolUsuarioModel = sequelize.define(
    "rol_usuario_model",
    attributes,
    options
  );

  RolUsuarioModel.associate = function (models) {
    RolUsuarioModel.belongsTo(models.rol_model, {
      as: "roles",
      foreignKey: "id_rol",
    });
    RolUsuarioModel.belongsTo(models.usuario_model, {
      as: "usuario",
      foreignKey: "id_usuario",
    });
  };

  return RolUsuarioModel;
};
