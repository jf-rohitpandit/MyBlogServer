const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('./db');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.get('/', (req, res) => {
	res.json({ message: 'Hello world' });
});

app.listen(PORT, () => {
	console.log('server live at port:', PORT);
});
