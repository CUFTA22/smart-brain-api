
const handleProfileGet = (req, res, knex) => {
    const { id } = req.params
    
    knex.select('*').where({id: id}).from('users').then(user => {
        if(user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('user not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))

}

module.exports = {
    handleProfileGet
    //? Same as handleProfileGet: handleProfileGet
}