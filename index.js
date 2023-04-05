const dbConfig = require('../config/db.config');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.catering = require('./cateringModel.js')(sequelize, DataTypes)
db.dress = require('./dressModel.js')(sequelize, DataTypes)
db.registered = require('./regModel.js')(sequelize, DataTypes)
db.hall = require('./hallModel.js')(sequelize, DataTypes)
db.salon = require('./salonModel')(sequelize, DataTypes)
db.vehicle = require('./vehicleModel')(sequelize, DataTypes)
db.feedback = require('./feedbackModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.registered.hasMany(db.catering); // A registered can have many caterings
db.catering.belongsTo(db.registered); // A catering belongs to a registered

db.registered.hasMany(db.dress); // A registered can have many caterings
db.dress.belongsTo(db.registered); // A catering belongs to a registered

db.registered.hasMany(db.feedback); // A registered can have many caterings
db.feedback.belongsTo(db.registered); // A catering belongs to a registered

db.registered.hasMany(db.vehicle); // A registered can have many caterings
db.vehicle.belongsTo(db.registered); // A catering belongs to a registered

db.registered.hasMany(db.salon); // A registered can have many caterings
db.salon.belongsTo(db.registered); // A catering belongs to a registered

db.registered.hasMany(db.hall); // A registered can have many caterings
db.hall.belongsTo(db.registered); // A catering belongs to a registered

module.exports = db
