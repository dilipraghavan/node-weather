const path = require('path');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');
const express = require('express');
const hbs = require('hbs');

const app = express();


//Set iew engine as HBS.
app.set('view engine', 'hbs');
const partialPath = path.join(__dirname,'../partials');
hbs.registerPartials(partialPath);


// Set the diretory path to access files.
const publicDirPath = path.join(__dirname, '../public');
app.use(express.static(publicDirPath));



//Handle Requests
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Dilip'
    });
});

app.get('/about', (req,res) =>{
    res.render('about', 
    {
        title: 'About me',
        name: 'Dilip'
    }
    );
});

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Dilip'
    })
});

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    
    geocode(req.query.address, (error,response) => {
        if(error){
            return res.send({
                error
            });
        }
        const  {lat, long} = response;
        weather(long,lat, (error, response) =>{
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                location: req.query.address,
                temparature: response.temparature
            });
        });
    })

    
});

app.get('/help/*', (req,res) =>{
    res.render('error',{
        message: 'Help article not found.',
        title: 'Error page',
        name: 'dilip'
    })
});

app.get('*',(req,res) =>{
    res.render('error',{
        message: 'Page not found.',
        title: 'Error page',
        name: 'dilip'
    })
});


app.listen(3000, () =>{
    console.log('App started at port 3000');
}
);