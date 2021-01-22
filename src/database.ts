const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || 'postgres',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const Sessions = sequelize.define('Sessions', {
 sessionUser : {
    type: Sequelize.STRING(500),
    allowNull: false
  },
  sessionId : {
    type: Sequelize.STRING(500),
    allowNull: true
  }
}, {freezeTableName: true})

const User = sequelize.define('User', {
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    email : {
        type: Sequelize.STRING,
        allowNull: false
    },
    password : {
        type: Sequelize.STRING,
        allowNull: false
    },
},{freezeTableName: true});

export default {Sessions, sequelize, User}
