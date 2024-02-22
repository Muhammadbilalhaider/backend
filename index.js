const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(express.json())

app.use(cors());

app.use('/user', router)

app.listen(5000, () => {
  console.log('Connected')
})



