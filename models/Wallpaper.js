const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Wallpaper extends Model {}

Wallpaper.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        wallpaper_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key:'id'
            }
        },
        elo_score: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'wallpaper'
    }
)

module.exports = Wallpaper;