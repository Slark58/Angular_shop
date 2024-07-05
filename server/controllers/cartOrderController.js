const uuid = require('uuid')
const path = require('path');
const {
  BasketProduct,
  Product
} = require('../models/models')
const ApiError = require('../error/ApiError');

class CartOrderController {


  async getAllCartItems(req, res, next) {

    let {basketId} = req.query

    const orderItems = await BasketProduct.findAll({
      where: {basketId: basketId}, 
      include: [
        {
          model: Product,
        }
      ] 
    })

    if (!orderItems) {
      return next(ApiError.badRequest('Товары не найдены'))
    }

    return res.json(orderItems)
    
  }
  async getOneCartItem(req, res, next) {

    const {basketId, productId} = req.query

    const orderItem = await BasketProduct.findOne({where: {basketId: basketId, productId}})

    if (!orderItem) {
      return next(ApiError.badRequest('Товары не найдены'))
    }

    return res.json(orderItem)
    
  }

  async increaseCartOrdersItem(req, res, next) {
    const {basketId, productId} = req.body

    const orderItem = await BasketProduct.findOne({where: {basketId: basketId, productId}})

    if (orderItem) {
      orderItem.quantity += 1;
      await orderItem.save()
    } else {
      await BasketProduct.create({ basketId, productId, quantity: 1 });
    }
    const cartItem = await BasketProduct.findOne({where: {basketId: basketId, productId}})
    
    if (!cartItem) {
      return next(ApiError.badRequest('Товар не найдены'))
    }
    
    return res.json(cartItem)

  }

  async decreaseCartOrdersItem(req,res, next) {
    const {basketId, productId} = req.body

    const orderItem = await BasketProduct.findOne({where: {basketId: basketId, productId}})

    if (orderItem) {
      if (orderItem.quantity > 1) {
        orderItem.quantity -= 1;
        await orderItem.save()
      } else {
        const item = await BasketProduct.findOne({where: {basketId: basketId, productId}})
        item.destroy()
      }
    } 

    const cartItem = await BasketProduct.findOne({where: {basketId: basketId, productId}})
    
    if (!cartItem) {
      return next(ApiError.badRequest('Товар не найдены'))
    }
    
    return res.json(cartItem)
  }

  async deleteCartOrdersItems(req, res, next) {
    const {basketId, productId} = req.query

    const orderItem = await BasketProduct.findOne({where: {basketId: basketId, productId}})
  
    if (!orderItem) {
      return next(ApiError.badRequest('Товар не найдены'))
    }

    const deleteItem = await orderItem.destroy()

    return res.json(deleteItem)

  }

  async clearBasket(req, res, next) {
    const {basketId} = req.query

    const items = await BasketProduct.findAll({where: {basketId: basketId}})

    if (!items) {
      return next(ApiError.badRequest('Товары не найдены'))
    }
    
    items.forEach((item) => item.destroy())
    
    return res.json(items)

  }

}

module.exports = new CartOrderController()