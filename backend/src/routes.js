const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const routes = require('express').Router()

routes.get('/devs', DevController.index)
routes.get('/devs/all', DevController.all)
routes.get('/devs/:username', DevController.show)
routes.post('/devs', DevController.store)
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)

routes.put('/devs/:devId', DevController.update)
routes.delete('/devs/:devId', DevController.delete)

module.exports = routes
