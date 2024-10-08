const uuid = require('uuid')
const path = require('path');
const {
  BasketProduct,
  Product,
  Order,
  OrderProduct,
  ProductChars,
  Img,
  ProductImgs,
  Type,
  Size,
  Color,
  Gender
} = require('../models/models')
const ApiError = require('../error/ApiError');



class OrderController {

  async createOrder(req, res, next) {
    try {
      let {
        userId,
        basketId,
        price,
        address
      } = req.body
      const products = await BasketProduct.findAll({
        where: {
          basketId: basketId
        },
        include: [{
          model: ProductChars,
        }]
      })

      console.log('userId: ', userId, 'basketId: ', basketId, 'price: ', price, 'address: ', address);
      console.log(products);
      if (!products) {
        return next(ApiError.badRequest('Товары не найдены'))
      }

      const order = await Order.create({
        userId: userId,
        price,
        address
      })


      products.forEach(item =>
        OrderProduct.create({
          productCharId: item.product_char.id,
          orderId: order.id,
          quantity: item.quantity
        })
      )


      return res.json(products)
    } catch (error) {
      return next(ApiError.badRequest('Ошибка в запросе создания!'))
    }
  }

  async createPayment(req, res, next) {
    let {
      price,
      orderId
    } = req.body
    
    console.log('orderId: ', orderId);
    

    const order = await Order.findOne({where: orderId})
    
    console.log(order);
    
    const n = Math.random() * 10
    console.log(n);
    if (n < 1.3) {
      next(ApiError.badRequest('Ошибка оплаты'))
      // return res.json({message: 'Error of payment', status: 404})
    } else {  
      order.status = 'Оплачен'
      order.save()
      return res.json({message: 'ok'})

    }
    
  }


  async getAllOrdersById(req, res, next) {
    let {
      userId
    } = req.query

    console.log(userId);
    const orders = await Order.findAll({
      where: {
        userId: userId
      },
      include: [{
        model: OrderProduct,
        attributes: ['id', 'quantity'],
        include: [{
          model: ProductChars,
          attributes: ['id'],
          include: [{
              model: Product,
              include: [{
                model: ProductImgs,
                attributes: ['id'],
                as: 'imgs',
                include: [{
                  model: Img,
                  attributes: ['img']
                }]
              }]
            },
            {
              model: Type,
            },
            {
              model: Size
            },
            {
              model: Color,
            },
            {
              model: Gender,
            },
          ]
        }]
      }]
    })

    if (!orders) {
      return res.status(404).json({
        error: 'Заказ не найден'
      });
    }

    res.json(orders)

  }
  async getOrderById(req, res, next) {
    let {
      orderId
    } = req.query

    console.log(orderId);
    const order = await Order.findOne({
      where: {
        id: orderId
      },
      include: {
        model: OrderProduct,
        attributes: ['id', 'quantity'],
        include: [{
          model: ProductChars,
          attributes: ['id'],
          include: [{
              model: Product,
              include: [{
                model: ProductImgs,
                attributes: ['id'],
                as: 'imgs',
                include: [{
                  model: Img,
                  attributes: ['img']
                }]
              }]
            },
            {
              model: Type,
            },
            {
              model: Size
            },
            {
              model: Color,
            },
            {
              model: Gender,
            },
          ]
        }]
      }
    })

    if (!order) {
      return res.status(404).json({
        error: 'Заказ не найден'
      });
    }

    res.json(order)

  }

}

module.exports = new OrderController()