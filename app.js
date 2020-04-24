const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie
-session');

const app = express();

app.use(bodyParser.json());

app.set('view engine','ejs');

// express-session config
app.use(
    session({
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: 'it is a secret!',
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
      }
    })
  )

app.use('/',require('./routes/api'))


const port = process.env.PORT||3000;

app.listen(port,()=>{
    console.log("running sucessfully");
})


