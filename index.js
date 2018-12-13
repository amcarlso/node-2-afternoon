const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config();
const products_controller = require('./products_controller')

const app = express();

app.use( bodyParser.json() );

app.get('/api/products', products_controller.getAll)
app.post('/api/products', products_controller.create)
app.get('/api/products/:id', products_controller.getOne)
app.put('/api/products/:id', products_controller.update)
app.delete('/api/products/:id', products_controller.delete)

const {CONNECTION_STRING, PORT} = process.env
massive(CONNECTION_STRING).then( dbInstance => {
  app.set('db', dbInstance)
} ).catch( err => console.log(err) );

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}.` ) } )

