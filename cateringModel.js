module.exports = (sequelize, DataTypes) => {

    const Catoring = sequelize.define("catoring", {
        chef: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.TIME
        },
        persons: {
            type: DataTypes.INTEGER
        }    
    
    })

    return Catoring

}