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
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "titulo",
    },
    temporada: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "temporada",
    },
    volumen: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "volumen",
    },
    descripcioncorta: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripcioncorta",
    },
    descripciondetallada: {
      type: DataTypes.STRING(4000),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descripciondetallada",
    },
    precionormal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precionormal",
      // get: function() { // or use get(){ }
      //   return this.getDataValue('precionormal')
      //   .toLocaleString('en-US',{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      // }
    },
    publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "publicacion",
      // get: function() { // or use get(){ }
      //   return this.getDataValue('publicacion')
      //     .toLocaleString('es-ES',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
      // }
    },
    imagen: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "imagen",
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precio",
      // get: function() { // or use get(){ }
      //   return this.getDataValue('precio')
      //   .toLocaleString('en-US',{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      // }
    },
    descontinuado: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descontinuado",
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "stock",
    },
    id_categoria: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_categoria",
      references: {
        key: "id",
        model: "categoria_model",
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
  };
  const options = {
    tableName: "productos",
    comment: "",
    timestamps: false,
    indexes: [
      {
        name: "id_categoria",
        unique: false,
        type: "BTREE",
        fields: ["id_categoria"],
      },
      {
        name: "id_pais",
        unique: false,
        type: "BTREE",
        fields: ["id_pais"],
      },
    ],
  };
  const ProductosModel = sequelize.define(
    "productos_model",
    attributes,
    options
  );

  //Relaciones con el modelo
  ProductosModel.associate = function (models) {
    ProductosModel.belongsTo(models.categoria_model, {
      as: "categorias",
      foreignKey: "id_categoria",
    });
    ProductosModel.belongsTo(models.pais_model, {
      as: "paisproductos",
      foreignKey: "id_pais",
    });
    ProductosModel.hasMany(models.carrito_productos_model, {
      as: "carritoproductos",
      foreignKey: "id_productos",
    });
    ProductosModel.hasMany(models.detalle_factura_model, {
      as: "detalleproductos",
      foreignKey: "id_productos",
    });
    ProductosModel.hasMany(models.productos_personas_model, {
      as: "productospersonas",
      foreignKey: "id_productos",
    });
  };

  return ProductosModel;
};
