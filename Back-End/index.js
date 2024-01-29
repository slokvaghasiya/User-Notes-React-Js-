const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const port = 4000;

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Initial Root for Test App')
})

app.use('/api/auth',require('./router/auth'))
app.use('/api/note',require('./router/Note'))

app.listen(port,()=>{
    console.log(`App is Running on ${port} Port Number`);
})


const conn = mongoose.connect('mongodb://127.0.0.1:27017/test');
if (conn) {
    console.log('Database Connectivity Done');
}