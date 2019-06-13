module.exports = function (sequelize, DataTypes) {
    var Book = sequelize.define("Book",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            author: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER(4),
                allowNull: false
            },
            // genre: {
            //     type: DataTypes.STRING(30),
            //     allowNull: false
            // },
            // plot: {
            //     type: DataTypes.STRING(1000),
            //     allowNull: false
            // },
            cover: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            avg_rating: {
                type: DataTypes.STRING(30),
                allowNull: false
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


        }
    );

    return Book;
};