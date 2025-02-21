require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const Location = require('./models/location')
const Image = require('./models/image')

const app = express()
app.use(express.json())
app.use(cors())

dayjs.extend(utc);
dayjs.extend(timezone);

const uri = `mongodb+srv://geiy_gregor:${process.env.DB_PASSWORD}@geiy-db.3urcf.mongodb.net/weather-now?retryWrites=true&w=majority&appName=Geiy-DB`

mongoose.connect(uri).then(() => {
    console.log("Database successfully connected!")
}).catch(() => {
    console.log("Database failed to connect!")
})

app.get('/', (req, res) => {
    res.json({ message: 'API Is Working!' })
})

app.get('/data', async (req, res) => {
    try {
        const data = await Location.find()
        res.json(data)
    } catch {
        throw new Error("Failed to retrieve data from database!")
    }
})

app.get('/image', async (req, res) => {
    try {
        const data = await Image.find()
        res.json(data)
    } catch {
        throw new Error("Failed to retrieve data from database!")
    }
})

app.post('/save', (req, res) => {
    try {
        const { latitude, longitude } = req.body
        const location = new Location({
            location: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
            date: dayjs().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss')
        })
        location.save()
    } catch {
        throw new Error("Failed to save location data to database!")
    }
})


app.listen(3000)