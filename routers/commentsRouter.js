import Router from 'express'
import checkAuth from '../middleware/checkAuth.js'
import handleValidationError from '../middleware/handleValidationError.js'
import {commentCreateValidation} from '../validations.js'
import {addComment, getComments} from '../controllers/CommentController.js'

const commentsRouter = Router()

commentsRouter.post('/add-comment/:id', checkAuth, handleValidationError, commentCreateValidation, addComment)
commentsRouter.get('/get-comments/:id', getComments)


export default commentsRouter