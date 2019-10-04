const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async all(req, res) {
        const users = await Dev.find()
        return res.json(users)
    },

    async index(req, res) {
        const { userid: userId } = req.headers
        const loggedUser = await Dev.findById(userId)

        const users = await Dev.find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.dislikes } }
            ]
        })
        
        return res.json(users)
    },

    async store(req, res) {
        const { username: user } = req.body

        const userExists = await Dev.findOne({ user })

        if(userExists) {
            return res.json(userExists)
        }
        
        const response = await axios.get(`https://api.github.com/users/${user}`)

        const { name, bio, avatar_url: avatar } = response.data

        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar
        })

        return res.json(dev)
    },

    async show(req, res) {
        const { username: user } = req.params
        const dev = await Dev.findOne({ user })
        return res.json(dev)
    },

    async update(req, res) {
        let { devId } = req.params
        let { name, bio } = req.body

        let user = await Dev.findById(devId)

        if(!user) {
            return res.status(400).json({ msg: 'Dev not exists.' })
        }

        user.name = name || user.name
        user.bio = bio || user.bio
        await user.save()

        return res.status(200).json({ msg: 'Dev atualizado com sucesso!' })
    },

    async delete(req, res) {
        let { devId } = req.params
        let result = await Dev.deleteOne({ _id: devId })
     
        if(result.n) {
            return res.status(200).json({ msg: 'Dev excluído com sucesso!' })
        }
        else {
            return res.status(400).json({ msg: 'Erro ao excluir dev.' })
        }
    }
}