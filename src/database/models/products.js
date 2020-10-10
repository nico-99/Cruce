module.exports = (sequelize,DataTypes )=>{
    const product = sequelize.define(
        'Product',
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            image: DataTypes.STRING,
        },
        {
            timestamps: false
        },
);
        return product
}

