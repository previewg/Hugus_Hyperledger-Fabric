const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
            email: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },


        }, {
            timestamps: true,
        },
        {
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            instanceMethods: {
                validPassword: function (password) {
                    return bcrypt.compareSync(password, this.password);
                }
            }


        },
    );
    return user;
};
