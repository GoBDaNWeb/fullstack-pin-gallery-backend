import PostModel from '../models/Post.js'
import UserModel from '../models/User.js'

export const createPin = async (req, res) => {
    try {
        const doc = new PostModel({
            imageUrl: req.body.imageUrl,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            author: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'не удалось создать пост'
        })
    }
}


export const getAllPins = async (req, res) => {
    try {
        const searchValue = req.query.search 
        const pageValue = req.query.page 

        if (!searchValue) {
            const posts = await PostModel.find().populate('author').sort({createdAt: 'desc'}).exec()

            res.json(posts)
        } else {
            const posts = await PostModel.find({title: {$regex: new RegExp('^'+searchValue+'.*','i')}}).populate('author').sort({createdAt: 'desc'}).exec()
            // pageValue
            res.json(posts)
        }

    } catch(err) {
        console.log(err)
    }
}

export const getPopularPins = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author').sort({viewsCount: 'desc'}).exec()

        res.json(posts)
    } catch(err) {
        console.log(err)
    }
}

export const getSavedPins = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate(
            {
                path: 'pined.author',
                select: 'firstName lastName avatarUrl  '
            }
        ).exec()

        res.json(user.pined)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Неn доступа'
        })
    }
}

export const getCreatedPins = async (req, res) => {
    try {
        const userId = req.params.id
        const posts = await PostModel.find({author: userId}).populate('author').sort({viewCount: 'desc'}).exec()

        res.json(posts)
    } catch(err) {
        console.log(err)
    }
}

export const getOnePin = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            {
                _id: postId,
            }, 
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after'
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                            success: false,
                            message: 'Не удалось получить Статью'
                        })
                }

                if (!doc) {
                    return res.status(404).json({
                        success: false,
                        message: 'Статья не найдена'
                    })
                }

                res.json(doc)
            }
        ).populate('author')
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Не удалось получить Статью'
        })
    }
}

export const deletePin = async (req, res) => {
    try {
        const pinId = req.body.pinId

        PostModel.findOneAndDelete(
            {
                _id: pinId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                            success: false,
                            message: 'не удалось получить пин'
                        })
                }

                if (!doc) {
                    return res.status(404).json({
                        success: false,
                        message: 'пин не найден'
                    })
                }

                res.json(doc)
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'не удалось получить пин'
        })
    }
}