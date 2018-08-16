const Sequelize = require('sequelize') ,
      sequelize = require('./index').sequelize ;

var User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING
    },
    username : {
       type : Sequelize.STRING
    } ,
    password: {
        type: Sequelize.STRING ,
        validate : {
            notEmpty : true
        }
    } ,
    email : {
        type : Sequelize.STRING ,
        validate : {
            isEmail : true
        }
    }

}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = {
    User
}