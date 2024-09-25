import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// API key for OpenWeatherMap
const API_KEY = 'b682afd2af8beb810b7876ab31723b86';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the index page
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

// Function to get weather data
const getWeather = async (url, res) => {
    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        if (weatherData.main) {
            res.render('index', { weather: weatherData, error: null });
        } else {
            res.render('index', { weather: null, error: 'Weather data not found' });
        }
    } catch (error) {
        res.render('index', { weather: null, error: 'Error retrieving weather data' });
    }
};

// Route to get weather data for the specified city
app.post('/weather', async (req, res) => {
    const city = req.body.city;
    const latLong = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
    try {
        const result = await axios.get(latLong);
        
        // Check if result data is not empty
        if (result.data.length > 0) {
            const lat = result.data[0].lat;
            const lon = result.data[0].lon;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            getWeather(url, res);
        } else {
            res.render('index', { weather: null, error: 'City not found' });
        }
    } catch (error) {
        res.render('index', { weather: null, error: 'Error retrieving geolocation data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
