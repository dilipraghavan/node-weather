console.log('Hello from client side js');




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value;

    fetch(`/weather?address=${location}`).then( (response) =>{
    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error;
            message2.textContent = '';
            return console.log(data.error);
        }
        message1.textContent = data.location;
        message2.textContent = data.temparature;
        console.log(data);
    } )
  
});

});

