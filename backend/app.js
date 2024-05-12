const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })
const connectDatabase = require('./config/connectDatabase')

connectDatabase();
const products = require('./routes/product');
const orders = require('./routes/order');

//middle ware express js 
app.use(express.json())

// cors is also a middle ware to fetch the data from the server
app.use(cors());

app.use('/api/v1/', products)
app.use('/api/v1/', orders)

app.listen(process.env.PORT, () => {
    console.log(`Server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV} `);
})
