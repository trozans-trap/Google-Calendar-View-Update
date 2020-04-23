const { google } = require('googleapis');

module.exports.addnewEvent =  (auth,event,cb)=>{

const calendar = google.calendar({ version: 'v3' , auth })


// const eventStartTime = new Date("April 29, 2020 11:15:00");

// const eventEndTime = new Date("April 29, 2020 16:35:00")



calendar.freebusy.query({
   resource: {
       timeMin: event.start.dateTime,
       timeMax: event.end.dateTime,
       timeZone: 'Asia/Kolkata',
       items: [{id: 'primary' }],
   },
},(err, res) => {
    if(err) 
     {
        msg='Free Busy Query Error: ';
        cb(msg);
        return
    }

    const eventsArr = res.data.calendars.primary.busy

    if(eventsArr.length == 0)
     calendar.events.insert(
         {calendarId: 'primary' , resource: event },
    err=>{
         if(err)  {
            msg='Calender Event Creation Error :';
            cb(msg);
            return;
         }

         else cb('Event Created');
    })
    else
    {
    cb('Sorry i am busy');
    return ;
    }
}
)
}