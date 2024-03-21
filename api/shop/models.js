const { Sequelize, DataTypes } = require('sequelize');
const { mysqlHost, mysqlDatabase, mysqlPassword, mysqlUser,mysqlPort } = require("../vars");
const sequelize = new Sequelize(mysqlDatabase, mysqlUser, mysqlPassword, {
  dialect: 'mysql',
  host: mysqlHost,
  port: mysqlPort
});

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Bill = sequelize.define('Bill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Items',
      key: 'id',
    },
  }
});

Item.hasMany(Bill, { foreignKey: 'itemId' });
Bill.belongsTo(Item, { foreignKey: 'itemId' });

// (async () => {
//   await sequelize.sync({ force: true });
//   console.log('Tables created successfully!');
// })();

module.exports = {Item,Bill}
