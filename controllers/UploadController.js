


export const uploadImage = async (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
}