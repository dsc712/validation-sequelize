const express       = require('express') ,
      app           = express() ,
      db            = require('./models/index') ,
      users         = require('./models/user') ,
      subscription  = require('./models/subscription') ,
      middleware    = require('./middleware/index') ,
      bodyParser    = require('body-parser') ;


app.use(bodyParser.urlencoded({extended : true})) ;
app.use(bodyParser.json()) ;

app.set("view engine" , "ejs" ) ;

app.get("/" , (req , res ) => {
   res.render('landing') ;
}) ;

app.get("/signup" , (req,res) => {
  res.render('signup') ;
}) ;

app.post("/signup" ,middleware.createTables ,middleware.validateUser , middleware.validateEmail  , (req , res) => {

        const user = req.body.user ;

            users.User.create({
                username: user['username'] ,
                firstName: user['firstname'],
                lastName: user['lastname'] ,
                email: user['email'] ,
                password: user['password']
            }).then( () => {
                console.log("user created successfully " ) ;
            }).then( () => {
                    subscription.Subscription.create({
                        email: user['email']
                    }).then( () => {
                        console.log("user is subscribed ") ;
                    }).catch( (err) => {
                        console.log("Can't subscribe user to the subscription list ") ;
                    });
            }).catch( (err) => {
                console.log(err) ;
            });

    res.redirect('back') ;

});


app.listen(3000 , (err) => {
    if(err){
        console.log(err) ;
    }else{
        console.log("app started on port 3000") ;
        db.makeConnection() ;
    }

}) ;