// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?',function(req,res){
   const datestring = req.params.date;
   try{
     const parsedate = new Date(datestring);     
       console.log('date parsed',parsedate)
      // console.log('date parsed',parsedate.getTime())

     if(!(parsedate === 'Invalid Date')){
      unixtimestamp =parsedate.getTime() ;
      utcdate = parsedate.getUTCDate() ;
    
      res.json(
        {
          unix : unixtimestamp ,
          utc : utcdate
        }
      )
     }else{
      console.log('date not valid');
      return res.status(400).send('Invalid date format');
     }
   }
   catch(error){

   }
   
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
