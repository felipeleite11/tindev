const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        const { userid: userId } = req.headers
        const { devId } = req.params

        const liker = await Dev.findById(userId)
        const target = await Dev.findById(devId)

        if(!target) {
            return res.status(400).json({ msg: 'Dev not exists.' })
        }

        //Verificação de match
        if(target.likes.includes(liker._id)) {
            console.log('Deu match!')
        }

        if(!liker.likes.includes(target._id)) {
            liker.likes.push(target._id)
            await liker.save()
        }

        return res.json(liker)
    }
}