const request =require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJqdW5yZWdtaTE0ODAiLCJhIjoiY2toMWxnNzB1MDdjNTJ2bXNhZDNvcHpocCJ9.D2DWJV7x6IFN5caYL8dqwg';
    
    request({url:url,json:true},(err,{body})=>{

        if(err){
            callback('Unable to connect server',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location.Try next location',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}
module.exports=geocode