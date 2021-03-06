module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define("Book", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        author: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        date: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        genre: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        plot: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        cover: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        avg_rating: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        }
    });

    return Book;
};
