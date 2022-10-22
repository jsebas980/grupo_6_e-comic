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
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nombrecompleto",
    },
  };
  const options = {
    tableName: "personas",
    comment: "",
    timestamps: false,
    indexes: [],
  };

  const PersonasModel = sequelize.define("personas_model", attributes, options);

  //Relaciones con el modelo
  PersonasModel.associate = function (models) {
    PersonasModel.hasMany(models.productos_personas_model, {
      as: "productospersonas",
      foreignKey: "id_personas",
    });
  };

  return PersonasModel;
};
