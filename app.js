const https=require("https");
const express =require("express");
const bodyParser=require("body-parser");
const app=express();

app.set('view engine','ejs');
let c="Agra",t=37,d="Clear",h=36,ws=4.2,i="https://openweathermap.org/img/wn/04n.png";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
  res.render("list",{cityname:c,temperature:t,desc:d,humidity:h,speed:ws,image:i});
});

app.post("/",function(req,res)
{
      
      
   c=req.body.cityName;
    const apikey="a753cc03da6a8fb64e8bff389d506f97";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + c + "&appid="+apikey + "&units=" + units;
    https.get(url,function(response)
    {
         console.log(response.statusCode);
        response.on("data",function(data)
        {
        const weatherdata=JSON.parse(data);
         t=weatherdata.main.temp;
        d=weatherdata.weather[0].description;
        h=weatherdata.main.humidity;
        ws=weatherdata.wind.speed;
        const icon=weatherdata.weather[0].icon;
        i="http://openweathermap.org/img/wn/"+icon+"@2x.png";
     
    });
    res.redirect("/");
    });
    
});


app.listen(process.env.PORT || 3000,function()
{
    console.log("server at 3000");
});