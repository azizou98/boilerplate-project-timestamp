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
function sendDate(parsedate,res){
  const options = {
    weekday: 'short', // Fri
    year: 'numeric',  // 2015
    month: 'short',   // Dec
    day: 'numeric',  // 25
    timeZone: 'GMT'  // GMT timezone
  };
  const houroptions= {
    hour: '2-digit', // 00 (padded)
    minute: '2-digit', // 00 (padded)
    second : '2-digit',
    hour12: false  ,  // 25
    timeZone: 'UTC'
  }

  unixtimestamp =parsedate.getTime() ;
  utcdate = parsedate.toUTCString();

  res.json(
    {
      unix : unixtimestamp ,
      utc : utcdate
    }
  )
 }

// your first API endpoint... 

app.get('/api/:date?',function(req,res){
   const datestring = req.params.date;
   try{

     let parsedate = new Date(datestring);     
       console.log('date parsed',datestring);
      // console.log('date parsed',parsedate.getTime())

     if(isNaN(parsedate.getTime())){
      if(datestring && /^\d+$/.test(datestring) && parseInt(datestring, 10) >= 0)
       {
          parsedate=new Date(parseInt(datestring, 10)*1);
          console.log('sema unix timestamp',parsedate);
          sendDate(parsedate,res);
        }else if(datestring === undefined)
        {
          parsedate=new Date();
          console.log('sema vide',parsedate);
          sendDate(parsedate,res);
        }else 
        {
          console.log('date not valid');
         return res.status(400).json({error:'Invalid Date'});
        }
     }
     else
     {
      sendDate(parsedate,res);
      }
   }
   catch(error){
   }
   
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
