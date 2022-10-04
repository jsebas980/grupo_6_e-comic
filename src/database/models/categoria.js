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
    nombrecategoria: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombrecategoria",
    },
  };
  const options = {
    tableName: "categoria",
    comment: "",
    timestamps: false,
    indexes: [],
  };
  const CategoriaModel = sequelize.define(
    "categoria_model",
    attributes,
    options
  );

  // sequelize.sync().then(() => {
  //   console.log('eComic Sync created successfully!');
  // }).catch((error) => {
  //   console.error('Unable to create table : ', error);
  // });

  //Relaciones con el modelo
  CategoriaModel.associate = function (models) {
    CategoriaModel.hasMany(models.productos_model, {
      as: "productoscategorias",
      foreignKey: "id_categoria",
    });
  };

  return CategoriaModel;
};
