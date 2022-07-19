import mongoose from 'mongoose'

const PostShema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            requierd: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        viewsCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('Post', PostShema)