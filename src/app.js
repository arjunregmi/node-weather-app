const path=require('path');
const express=require('express');
const hbs=require('hbs');
const request=require('request')

const geocode=require('./utilis/geocode');
const forecast=require('./utilis/forecast');
const app=express();

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')



//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//index route
app.get('',(req,res)=>{

      res.render('index',{
          title:"Weather",
          name:"Arjun Regmi",
          address:"Bardaghat,Nawalparasi"
      });
})

//About route
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Arjun Regmi",
        address:"Bardaghat,Nawalparasi"
    })
})


//Help route
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Arjun Regmi",
        address:"Bardaghat,Nawalparasi"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a address"
        })
    }

    geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
   
        if(err){
            return res.send({err});
        }
        forecast(latitude,longitude,(err,forecastData)=>{
          if(err){
            return res.send({err});
          }
         res.send({
             forecast:forecastData,
             location,
             address:req.query.address
         })
        })
    })

})

app.get('/products',(req,res)=>{
 if(!req.query.search){
     return res.send({
         error:"You must provide a search term"
     })
 }
 
 console.log(req.query.search)
 res.send({
     products:[]
 })



})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Error Page",
        name:"Arjun Regmi",
        errMsg:"Help article not found" 
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error Page",
        name:"Arjun Regmi",
        errMsg:"Page not found" 
    })
})


//Server Setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server started on port ${PORT}`)); 