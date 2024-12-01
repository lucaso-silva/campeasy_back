const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 5001;
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('hello');
});

app.post('/', (req, res) => {
    const latitude = req.body.lat;
    const longitude = req.body.long;

    if(!latitude ) {
        res.status(400).json({ msg: `Bad request. no lat`})
    } else if(!longitude) {
        res.status(400).json({ msg: `Bad request. no long`})
    } else {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=3`;
        // const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=3`
        axios.get(url)
            .then((response) => res.json(response.data))
            .catch((err) => console.error(err));
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));