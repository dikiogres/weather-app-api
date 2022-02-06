const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "e4f561c4afe1060c65710aea4d893497"
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    https.get(url, function(response) {
        //console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            //console.log(weatherData);

            const temp = weatherData.main.temp;
            //console.log(temp);

            const weatherDesc = weatherData.weather[0].description;
            //console.log(weatherDesc);

            const weatherIcon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

            res.write("<p>The weather is currently " + weatherDesc + "</p>")
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imgURL + ">" );

            res.send();

        })
    })
});


app.listen(3000, function() {
    console.log('Server is running at http://localhost:3000');
})