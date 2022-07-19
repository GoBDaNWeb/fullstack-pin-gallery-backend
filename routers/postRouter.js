import Router from 'express'
import {createPin, getOnePin, getPopularPins, getAllPins, getSavedPins, getCreatedPins, deletePin} from '../controllers/PostController.js'
import checkAuth from '../middleware/checkAuth.js'

const postRouter = Router()

postRouter.post('/create', checkAuth, createPin)
postRouter.get('/all', getAllPins)
postRouter.get('/popular', getPopularPins)
postRouter.get('/created-pins/:id', getCreatedPins)
postRouter.get('/saved-pins/:id', getSavedPins)
postRouter.get('/:id', getOnePin)
postRouter.delete('/delete-pin', checkAuth, deletePin)

export default postRouter