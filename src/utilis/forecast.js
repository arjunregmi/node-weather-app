const request =require('request')

const forecast=(latitude,longitude,callback)=>{
const url='http://api.weatherstack.com/current?access_key=c3bfaea5ae74d96fa8a9454f04cf2821&query='+ latitude + ','+ longitude 
    
    request({url,json:true},(err,{body})=>{

        if(err){
            callback('Unable to connect server',undefined)
        }else if(body.err){
            callback('Unable to find location.Try next location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] +". It is currently " +body.current.temperature + "degrees out . It feels like "+ body.current.feelslike + " degrees out . The humidity is "+ body.current.humidity + " %."
                
            )
    }

    })
}
module.exports=forecast