const User = require('./User');
const Wallpaper = require('./Wallpaper');


User.hasMany(Wallpaper, {
    foreignKey: 'user_id'
})

Wallpaper.belongsTo(User, {
    foreignKey: 'user_id'
})


module.exports = { User, Wallpaper }
