'use strict';
module.exports = (sequelize, DataTypes) => {
  const NpReport = sequelize.define('NpReport', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    decibel: DataTypes.FLOAT
  }, {});
  NpReport.associate = function(models) {
    // associations can be defined here
  };
  return NpReport;
};