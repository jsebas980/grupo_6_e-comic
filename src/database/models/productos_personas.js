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
    id_personas: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_personas",
      references: {
        key: "id",
        model: "personas_model",
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
        model: "rol_personas_model",
      },
    },
  };
  const options = {
    tableName: "productos_personas",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "id_productos",
        unique: false,
        type: "BTREE",
        fields: ["id_productos"],
      },
      {
        name: "id_personas",
        unique: false,
        type: "BTREE",
        fields: ["id_personas"],
      },
      {
        name: "id_rol",
        unique: false,
        type: "BTREE",
        fields: ["id_rol"],
      },
    ],
  };

  const ProductosPersonasModel = sequelize.define(
    "productos_personas_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  ProductosPersonasModel.associate = function (models) {
    ProductosPersonasModel.belongsTo(models.personas_model, {
      as: "personas",
      foreignKey: "id_personas",
    });
    ProductosPersonasModel.belongsTo(models.rol_personas_model, {
      as: "rolespersonas",
      foreignKey: "id_rol",
    });
    ProductosPersonasModel.belongsTo(models.productos_model, {
      as: "productos",
      foreignKey: "id_productos",
    });
  };

  return ProductosPersonasModel;
};
