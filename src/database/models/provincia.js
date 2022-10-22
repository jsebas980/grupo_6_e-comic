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
    id_pais: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_pais",
      references: {
        key: "id",
        model: "pais_model",
      },
    },
  };
  const options = {
    tableName: "provincia",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "id_pais",
        unique: false,
        type: "BTREE",
        fields: ["id_pais"],
      },
    ],
  };
  const ProvinciaModel = sequelize.define(
    "provincia_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  ProvinciaModel.associate = function (models) {
    ProvinciaModel.belongsTo(models.pais_model, {
      as: "pais",
      foreignKey: "id_pais",
    });
    ProvinciaModel.hasMany(models.usuario_model, {
      as: "usuario",
      foreignKey: "id_provincia",
    });
    ProvinciaModel.hasMany(models.carrito_model, {
      as: "carrito",
      foreignKey: "id_provincia",
    });
  };

  return ProvinciaModel;
};
