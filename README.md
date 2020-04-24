

for local use (ask Google api credentials from me)               

 
use (in web browser)        
http://localhost:3000/home              

modules used-          

googleapis         
express               
express-session          
ejs                          
body-parser              

After visiting the link click get started you will be redirected to google authorization page select gmail id and give permission then 3 options are available         
1. to view upcoming events            
2. to create events (you will directed to form page fill details and time as per format in placeholder)         
    you will recieve event created if event created in google calender     
    else busy if date is busy   
    or some error if there is error                   

3. logout to destroy the session      


application structure is as per following-       
   
    
app.js    

routes/api.js (where various get and post requests are made and access token is checked at each request , here various functions are used from controller by requiring them from files in controller )       

views (folder containing ejs file as ejs is used as templating engine)      

controller(folder where     
            - google.js consist of oauth functions   
            -calender.js consists of function to view events    
            -updatecalender.js consists of function to create events    
        )      
