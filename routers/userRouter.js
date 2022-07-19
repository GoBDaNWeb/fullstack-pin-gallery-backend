import Router from 'express'
import {register, login, getUser, getMe, userSavePin, userRemovePin, userUpdateAvatar } from '../controllers/UserController.js'
import checkAuth from '../middleware/checkAuth.js'
import handleValidationError from '../middleware/handleValidationError.js'
import { loginValidation, registerValidation } from '../validations.js'

const userRouter = new Router()

userRouter.post('/auth/login', loginValidation, handleValidationError, login)
userRouter.post('/auth/register', registerValidation, handleValidationError, register)
userRouter.get('/auth/me', checkAuth, getMe)
userRouter.get('/user/:id', getUser)
userRouter.patch('/save-pin', checkAuth, userSavePin)
userRouter.patch('/remove-pin', checkAuth, userRemovePin)
userRouter.patch('/update-avatar', checkAuth, userUpdateAvatar)

export default userRouter 