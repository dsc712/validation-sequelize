const Sequelize = require('sequelize') ,
      sequelize = require('./index').sequelize ;

var Subscription = sequelize.define('subscription', {
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
    Subscription
}