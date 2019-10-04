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

        if(!liker.dislikes.includes(target._id)) {
            liker.dislikes.push(target._id)
            await liker.save()
        }

        return res.json(liker)
    }
}