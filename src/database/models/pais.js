const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombre"
    }
  };
  const options = {
    tableName: "pais",
    comment: "",
    indexes: []
  };
  const PaisModel = sequelize.define("pais_model", attributes, options);

  //Relaciones con el modelo
  // PaisModel.associate = function (models) {
  //   PaisModel.hasMany(models.ProductosModel, { 
  //     as: "productospais",
  //     foreignKey: "id_pais"
  //   });

  //   PaisModel.hasMany(models.UsuarioModel, { 
  //     as: "usuario",
  //     foreignKey: "id_pais"
  //   });

  //   PaisModel.hasMany(models.ProvinciaModel, { 
  //     as: "provincia",
  //     foreignKey: "id_pais"
  //   });

  //   PaisModel.hasMany(models.CarritoModel, { 
  //     as: "carrito",
  //     foreignKey: "id_pais"
  //   });
  // };

  return PaisModel;
};