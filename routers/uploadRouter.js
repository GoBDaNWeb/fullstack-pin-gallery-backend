import Router from 'express'
import multer from 'multer'
import {uploadImage} from '../controllers/UploadController.js'
import checkAuth from '../middleware/checkAuth.js'

const uploadRouter = Router()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage})

uploadRouter.post('/', upload.single('image'), uploadImage)

export default uploadRouter