import mongoose from 'mongoose'

const UserShema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            requierd: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String,
        },
        pined: [
            {
                title: {type: String},
                imageUrl: {type: String},
                description: {type: String},
                author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
                viewsCount: {type: Number},
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('User', UserShema)