/*
1. / --> this is working (root)
2. /signin --> POST | success/fail
3. /register --> POST | user
4. /profile/:userId --> GET | user
5. /image --> PUT | update user score
*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express()
app.use(bodyParser.json())
app.use(cors())

//* Root ------------------------------------------------------------------------------------


app.get('/', (req, res) => {
    res.send(knex.users)
})


//* Sign in ---------------------------------------------------------------------------------


app.post('/signin', signin.handleSignIn(knex, bcrypt))


//* Register ---------------------------------------------------------------------------------


app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})


//* profile/:userId --------------------------------------------------------------------------


app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})


//* Image ------------------------------------------------------------------------------------


app.put('/image', (req, res) => {image.handleImage(req, res, knex)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log('Running')
})