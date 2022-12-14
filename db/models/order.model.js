const { DataTypes, Model } = require('sequelize');

const { USERS_TABLE } = require('./user.model');

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userID: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USERS_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
}

const ORDERS_TABLE = 'orders';

class Order extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Order',
    }
  }
}

module.exports = { Order, OrderSchema, ORDERS_TABLE };