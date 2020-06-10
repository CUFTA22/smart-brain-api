/*
1. / --> this is working (root)
2. /signin --> POST | success/fail
3. /register --> POST | user
4. /profile/:userId --> GET | user
5. /image --> PUT | update user score
*/

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
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
    res.send('workz')
})


//* Sign in ---------------------------------------------------------------------------------


app.post('/signin', signin.handleSignIn(knex, bcrypt))
//! (req, res) => {} , This shit is called Dependency Injection
//! Same shit as (req, res) => {signin.handleSignIn(req, res, knex, bcrypt)}


//* Register ---------------------------------------------------------------------------------


app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})


//* profile/:userId --------------------------------------------------------------------------


app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})


//* Image ------------------------------------------------------------------------------------


app.put('/image', (req, res) => {image.handleImage(req, res, knex)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log('Issa runningn boi')
})