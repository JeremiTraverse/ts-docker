const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://jeremitraverse:@localhost:5432/popinadev")

const Sessions = sequelize.define('Sessions', {
    rToken : {
        type: Sequelize.STRING,
        allowNull: false
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

export default {User, Sessions, sequelize }
