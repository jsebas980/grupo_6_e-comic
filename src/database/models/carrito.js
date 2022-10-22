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
    nombrecompleto: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombrecompleto",
    },
    correoelectronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "correoelectronico",
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "direccion",
    },
    numerotelefono: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "numerotelefono",
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ciudad",
    },
    detallesadicionales: {
      type: DataTypes.STRING(600),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "detallesadicionales",
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
    id_provincia: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_provincia",
      references: {
        key: "id",
        model: "provincia_model",
      },
    },
  };
  const options = {
    tableName: "carrito",
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
        name: "id_pais",
        unique: false,
        type: "BTREE",
        fields: ["id_pais"],
      },
      {
        name: "id_provincia",
        unique: false,
        type: "BTREE",
        fields: ["id_provincia"],
      },
    ],
  };

  const CarritoModel = sequelize.define("carrito_model", attributes, options);

  //Relaciones con el modelo
  CarritoModel.associate = function (models) {
    CarritoModel.hasMany(models.carrito_productos_model, {
      as: "productoscarritos",
      foreignKey: "id_carrito",
    });
    CarritoModel.belongsTo(models.pais_model, {
      as: "paiscarrito",
      foreignKey: "id_pais",
    });
    CarritoModel.belongsTo(models.provincia_model, {
      as: "provinciacarrito",
      foreignKey: "id_provincia",
    });
    CarritoModel.belongsTo(models.usuario_model, {
      as: "usuariocarrito",
      foreignKey: "id_usuario",
    });
  };

  return CarritoModel;
};
