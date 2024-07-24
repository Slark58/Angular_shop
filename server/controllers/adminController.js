const uuid = require('uuid')
const path = require('path');
const {
  User,
  Product,
  ProductInfo,
  Order,
  OrderProduct
} = require('../models/models')
const ApiError = require('../error/ApiError');

class AdminController {


  async getUsers(req, res, next) {

    try {
      let {
        page,
        limit
      } = req.query

      page = page || 1
      limit = limit || 5
      let offset = page * limit - limit

      const users = await User.findAndCountAll({
        limit,
        offset
      })

      if (!users) {
        return next(ApiError.badRequest('Пользователи не найдены'))
      }

      return res.json(users)

    } catch (error) {
      return next(ApiError.badRequest(error))
    }


  }

  async deleteUser(req, res, next) {
    try {
      let {
        userId
      } = req.query

      const user = await User.findByPk(userId)

      console.log(user);
      user.destroy()

      return res.json(user)

    } catch (error) {
      return next(ApiError.badRequest(error))
    }

  }
  async getProducts(req, res, next) {

    try {
      let {
        page,
        limit
      } = req.query

      page = page || 1
      limit = limit || 5
      let offset = page * limit - limit

      const products = await Product.findAndCountAll({
        limit,
        offset
      })

      if (!products) {
        return next(ApiError.badRequest('Продукты не найдены'))
      }

      return res.json(products)

    } catch (error) {
      return next(ApiError.badRequest(error))
    }

  }

  async getOrders(req, res, next) {

    try {
      let {
        page,
        limit
      } = req.query

      page = page || 1
      limit = limit || 5
      let offset = page * limit - limit

      const orders = await Order.findAndCountAll({
        include: [
          // {
          //   model: OrderProduct,
          //   include: [
          //     {
          //       model: Product
          //     }
          //   ]
          // },
          {
            model: User
          },
        ],
        subQuery: false,
        limit,
        offset
      })

      if (!orders) {
        return next(ApiError.badRequest('Продукты не найдены'))
      }

      return res.json(orders)
    } catch (error) {
      return next(ApiError.badRequest(error))
    }

  }


  async updateRole(req, res, next) {

    try {
      const {
        userId,
        role
      } = req.body

      const user = await User.findOne({
        where: {
          id: userId
        }
      })

      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'))
      }
      user.role = role
      await user.save()

      return res.json(user)
    } catch (error) {
      return next(ApiError.badRequest(error))

    }


  }
  async updateStatusOrder(req, res, next) {

    try {
      const {
        orderId,
        status
      } = req.body

      const order = await Order.findOne({
        where: {
          id: orderId
        }
      })

      if (!order) {
        return next(ApiError.badRequest('Заказ не найден'))
      }
      order.status = status
      await order.save()

      return res.json(order)

    } catch (error) {
      return next(ApiError.badRequest(error))

    }

  }


  async getProductsInOrder(req, res, next) {
    try {
      const {
        orderId
      } = req.query

      const products = await OrderProduct.findAll({
        where: {
          orderId: orderId
        },
        include: [{
          model: Product
        }]
      })


      if (!products) {
        return next(ApiError.badRequest('Товары не найдены'))
      }

      return res.json(products)

    } catch (error) {
      return next(ApiError.badRequest(error))
    }
  }

}

module.exports = new AdminController()