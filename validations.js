import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({min: 5})
]

export const registerValidation = [
    body('firstName', 'укажите имя').isLength({min: 3}).isString(),
    body('firstName', 'укажите фамилию').isLength({min: 3}).isString(),
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('avatarUrl', 'неверный формат аватара').optional().isString()
]

export const commentCreateValidation = [
    body('text', 'Введите текст комментария').isLength({min: 1}).isString(),
]