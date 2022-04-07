const express = require('express');
const bodyParser = require('body-parser') // json body
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
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
	// Check user against db
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.post('/api/createNewUser', async (req, res) => {
	console.log(req.body);
	const token = generateAccessToken({username: req.body.username});
	res.json(token);
});

app.get('/', auth, async (req,res) => {
	res.send('hello world');
});

// start app
app.listen(port, () => {
	console.log(`example app listening on port ${port}`);
});
