const users        = require('../models/user') ,
      subscription = require('../models/subscription') ,
      db           = require('../models/index');

const middlewareObj = {} ;

middlewareObj.createTables = function(req , res , next ){

    db.sequelize.sync()
        .then( () => {
            console.log("all tables created ") ;
            next() ;
        }).catch((err) => {
            console.log(err) ;
            res.redirect('back') ;
        }) ;

}

// function for checking uniqueness of email
async function isUsernameUnique(username){

    let status ;
    await users.User.findOne({ where: { username : username } })
        .then( user => {
            if(user == null ){
                status = true ;
            }else{
                status = false ;
            }
        }) ;

    console.log("status : " + status) ;
    return status ;
}

// function for checking uniqueness of username
async function isEmailUnique(email){

    let status ;
    await subscription.Subscription.findOne({ where: { email : email } })
        .then( email => {
            if(email == null ){
                status = true ;
            }else{
                status = false ;
            }
        }) ;
    console.log("status : " + status) ;
    return status ;
}

middlewareObj.validateEmail = async function(req, res , next ){

    const user = req.body.user ;
    const email = user['email'] ;

    let status = await isEmailUnique(email) ;
    if( status ){
       // create user
        console.log("email is available") ;
        next() ;
    }else{
        // email already exists
        console.log("user with given email id already exists  ") ;
        res.redirect('back') ;
    }
}


middlewareObj.validateUser = async function(req , res , next) {
  const user = req.body.user ;
  const username = user['username'] ;

  let status = await isUsernameUnique(username) ;
  if(status){
      //validate email now
      console.log("username is available") ;
      next() ;
  }else{
      // username already taken
      console.log("username is already taken ") ;
      res.redirect('back') ;
  }
}



module.exports = middlewareObj ;