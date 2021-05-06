const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://rohit:rohit@cluster0.6egng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database connected'));
