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
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "apellido",
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
    contraseña: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "contraseña",
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
      allowNull: true,
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
    imagen: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "imagen",
    },
  };
  const options = {
    tableName: "usuario",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "id_pais",
        unique: false,
        type: "BTREE",
        fields: ["id_pais"],
      },
      {
        name: "usuario_ibfk_2",
        unique: false,
        type: "BTREE",
        fields: ["id_provincia"],
      },
    ],
  };

  const UsuarioModel = sequelize.define("usuario_model", attributes, options);

  //Relaciones con el modelo
  UsuarioModel.associate = function (models) {
    UsuarioModel.belongsTo(models.pais_model, {
      as: "pais",
      foreignKey: "id_pais",
    });
    UsuarioModel.belongsTo(models.provincia_model, {
      as: "provincia",
      foreignKey: "id_provincia",
    });
    UsuarioModel.hasMany(models.rol_usuario_model, {
      as: "rol_usuario",
      foreignKey: "id_usuario",
    });
    UsuarioModel.hasMany(models.carrito_model, {
      as: "carrito",
      foreignKey: "id_usuario",
    });
    UsuarioModel.hasMany(models.factura_model, {
      as: "facturausuario",
      foreignKey: "id_usuario",
    });
  };

  return UsuarioModel;
};
