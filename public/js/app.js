console.log("LOve u arjun");

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#msg-1')
const messageTwo=document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    
    fetch('http://localhost:4000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.err){
              messageOne.textContent=data.err
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.location
        }
    })
})
}) 