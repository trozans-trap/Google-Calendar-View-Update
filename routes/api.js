const express = require('express');
const {google} = require('googleapis');
const router = express.Router();
//Body parser
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


const googleutil = require('../controller/google')
const viewcalender = require('../controller/calender')
const updatecalender = require('../controller/updatecalender')

router.get('/home',(req,res)=>{
    res.render('home');
})

router.get('/',(req,res) => {
    res.redirect(googleutil.urlGoogle());
})

// middleware to check and save session cookie
const setCookie = async (req, res, next) => {
    googleutil.getGoogleAccountFromCode(req.query.code, (err, res) => {
        if (err) {
            res.redirect('/login');
        } else {
            req.session.user = res;
        }
        next();
    });
}

router.get('/auth/success',setCookie ,(req,res)=> {
    res.render('dashboard');
})

router.get('/events',(req,res)=> {

    if (req.session.user) {
    // get oauth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: req.session.user.accessToken
    });

    // get calendar events by passing oauth2 client
    viewcalender.listEvents(oauth2Client, (events) => {  
        console.log(events);         
        const data = {
            name: req.session.user.name,
            displayPicture: req.session.user.displayPicture,
            id: req.session.user.id,
            email: req.session.user.email,
            events: events
        }
        res.render('viewevents',{data: data})
    });
}
})

router.get('/addevent',(req,res)=>{
    res.render('addevent');
})

router.post('/addevent', urlencodedParser,(req,res)=> {

   console.log(req.body);
   if (req.session.user) {
    // get oauth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
        access_token: req.session.user.accessToken
    });

    const eventStartTime = new Date(req.body.starttime);

     const eventEndTime = new Date(req.body.endtime);
    const event = {
        summary: req.body.summary,
        location: req.body.location,
        description: req.body.description,
        start: {
            dateTime: eventStartTime,
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'Asia/Kolkata',
        },
        colorId: 1 ,
     }     

    updatecalender.addnewEvent(oauth2Client,event,(msg)=>{
        
          res.render('result',{msg: msg})
    })
}
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.redirect('/home');
        }
        res.clearCookie('sid');
        res.render('home');
    });
})

module.exports = router;