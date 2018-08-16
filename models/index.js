const Sequelize = require('sequelize') ;

var sequelize = new Sequelize('mydb', 'dsc712', '1234', {
    host: 'localhost',
    dialect: 'mysql',

});

const makeConnection = function(){
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}



module.exports = {
    sequelize ,
    makeConnection
}