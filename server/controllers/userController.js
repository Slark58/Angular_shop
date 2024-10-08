const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    User,
    Basket
} = require('../models/models')

const generateJwt = (id, name, email, phone, role) => {
    return jwt.sign({
            id,
            name,
            email,
            phone,
            role
        },
        process.env.SECRET_KEY, {
            expiresIn: '24h'
        }
    )
}

class UserController {
    async registration(req, res, next) {
        console.log(req);
        const {
            name,
            email,
            password,
            phone,
            role
        } = req.body

        console.log('name: ' + name, 'email: ' +  email, 'phone: ' +  phone, 'role: ' +  role);
        

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({
            where: {
                email
            }
        })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({
            name,
            email,
            phone,
            role,
            password: hashPassword
        })
        const basket = await Basket.create({
            userId: user.id
        })
        const token = generateJwt(user.id, user.firstName, user.email, user.lastName, user.role)
        return res.json({
            token,
            basket
        })
    }

    async login(req, res, next) {
        const {
            email,
            password
        } = req.body
        console.log(email, password);
        const user = await User.findOne({
            where: {
                email
            }
        })
        console.log(user);
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const basket = await Basket.findOne({
            where: {
                userId: user.id
            }
        })
        const token = generateJwt(user.id, user.name, user.email, user.phone, user.role)
        return res.json({
            token,
            basket
        })
    }

    async check(req, res, next) {
        console.log(req.user);
        const basket = await Basket.findOne({
            where: {
                userId: req.user.id
            }
        })
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.phone, req.user.role)

        return res.json({
            token,
            basket
        })
    }
}

module.exports = new UserController()