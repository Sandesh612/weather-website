const path = require('path')
const express = require('express')
const hbs=require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

const partialPath=path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialPath);

//path setup for index.hbs 
const publicDirectoryPath = path.join(__dirname, '../public');
app.set('view engine','hbs'); //for hbs(handlebars)
app.use(express.static(publicDirectoryPath));

//path setup for about.hbs and help.hbs after renaming the file of views to templates
const viewsPath=path.join(__dirname,'../templates/views');
app.set('views',viewsPath);


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Aakash'
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{ 
        title:'About me',
        name:'Aakash'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some helpful text.',
        name:'Aakash'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(req.query.address, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aakash',
        errorMessage:'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aakash',
        errorMessage:'Page not found!'
    })
})
app.listen(port, () => {
    console.log('Server is up on port.' +port);
})