
//? We are doing clarifai here so noone can steal our Key!

const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'fa0e31e83f824986b640c3ed1f0bfcef'
});
const handleApiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('Anejbel tu work wit ejpiaj'))
}


const handleImage = (req, res, knex) => {
    const { id } = req.body
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get count for entries'))
}

module.exports = {
    handleApiCall,
    handleImage
    //? Same as handleImage: handleImage
}