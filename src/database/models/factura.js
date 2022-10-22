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
    id_estadofactura: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_estadofactura",
      references: {
        key: "id",
        model: "estado_factura_model",
      },
    },
    envio: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "envio",
    },
    impuesto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "impuesto",
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "total",
      get: function () {
        // or use get(){ }
        return this.getDataValue("total").toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
      },
    },
    id_modopago: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_modopago",
      references: {
        key: "id",
        model: "modo_pago_model",
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "fecha",
      get: function () {
        // or use get(){ }
        return this.getDataValue("fecha").toLocaleString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
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
    id_pais: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_pais",
    },
    id_provincia: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_provincia",
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
    detalleadicionales: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "detalleadicionales",
    },
  };
  const options = {
    tableName: "factura",
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
        name: "id_estadofactura",
        unique: false,
        type: "BTREE",
        fields: ["id_estadofactura"],
      },
      {
        name: "id_modopago",
        unique: false,
        type: "BTREE",
        fields: ["id_modopago"],
      },
    ],
  };

  const FacturaModel = sequelize.define("factura_model", attributes, options);

  //Relaciones con el modelo
  FacturaModel.associate = function (models) {
    FacturaModel.hasMany(models.detalle_factura_model, {
      as: "facturadetalle",
      foreignKey: "id_factura",
    });
    FacturaModel.belongsTo(models.estado_factura_model, {
      as: "estadofactura",
      foreignKey: "id_estadofactura",
    });
    FacturaModel.belongsTo(models.modo_pago_model, {
      as: "modopagofactura",
      foreignKey: "id_modopago",
    });
    FacturaModel.belongsTo(models.usuario_model, {
      as: "usuariofactura",
      foreignKey: "id_usuario",
    });
  };

  return FacturaModel;
};
