const express = require('express'); // remember if using ESM, this can be changed to import express from 'express'
const app = express();
const bodyParser = require('body-parser');

// /routes/users.js
const routes = express.Router() // this allows us to add new routes similar to how we can do it in our main entry script

// the methods and URI methods work the same way as it would if we were to add the in the main entry point file.
routes.get('/', (req, res) => {
	return res.send({message: 'hello'})
})

// route below is equivalent to /users/:id as remember all routes in this file are below the /users URI path
routes.get('/:id', (req, res) => { 
	return res.send({message: `${req.params.id} user requested`})
});

routes.post('/', (req, res) => {
	return res.send({message: 'success'})
})

function someMiddleware(req, res, next) {
	if (req.body && req.body.test === true) {
		req.auth = 'yes'; // you can add a new property called auth on the req object
	} else {
		return res.send('invalid request'); // this aborts the middleware pipeline and a response is returned right away
	}

	next();
}

app.use(bodyParser.json())

app.use(someMiddleware);

app.use('/users', routes) // as we have our own routes file, we will instead of utilize the use() method on app to mount our routes file from another module into the /users route

app.listen(3000, () => {
    console.log('Express started on port 3000')
});