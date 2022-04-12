const express = require('express');
const bodyParser = require('body-parser') // json body
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcryptjs'); // encrypt passwords etc
const db = require('./db');
const port = 3000;
// secrets stored in env file
const dotenv = require('dotenv');
dotenv.config();

const auth = require('./middleware/authenticate');

// read the secret token from .env file
//process.env.TOKEN_SECRET;

app.use(bodyParser.json())
	
// generate a key
// require('crypto').randomBytes(64).toString('hex')

function generateAccessToken(username) {
	// Check user against d3
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.post('/api/createNewUser', async (req, res) => {
	const token = generateAccessToken({username: req.body.username});
	res.json(token);
});

app.post('/api/createMovie', async(req, res) => {
	await db.createMovie(req.body.name, req.body.rating);	
	res.send("saved");
});

app.delete('/api/movie/:id', async(req, res) => {
	await db.deleteById(req.params.id);
	res.sendStatus(204);
});

app.get('/', async (req,res) => {
	let m = await db.getMovies();
	res.send(m);
});

// start app
app.listen(port, () => {
	console.log(`example app listening on port ${port}`);
});
