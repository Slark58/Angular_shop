const uuid = require('uuid')
const path = require('path');
const {
  BasketProduct,
  Product,
  ProductChars,
  Type,
  Size,
  Color,
  Gender,
  ProductImgs,
  Img
} = require('../models/models')
const ApiError = require('../error/ApiError');

class CartOrderController {


  async getAllCartItems(req, res, next) {

    let {
      basketId
    } = req.query

    console.log(basketId);

    const orderItems = await BasketProduct.findAll({
      where: {
        basketId: basketId,
      },
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
        },

      ]
    })

    if (!orderItems) {
      return next(ApiError.badRequest('Товары не найдены'))
    }

    console.log(orderItems);

    //* Группируем изображения по цвету
    orderItems.forEach(item => {
      const productChars = item.product_char;
      const product = productChars.product;
      const imgs = product.imgs;
      const colorId = productChars.colorId; //* Предполагаем, что colorId есть в ProductChars

      const filteredImgs = imgs.filter(img => img.colorId === colorId)

      const modifiedProduct = {
        ...product.dataValues,
        filteredImgs,
      };

      return {
        ...item.dataValues,
        product_chars: {
          ...productChars.dataValues,
          product: modifiedProduct
        }
      }

    });

    return res.json(orderItems)

  }
  async getOneCartItem(req, res, next) {

    const {
      basketId,
      productId
    } = req.query

    const orderItem = await BasketProduct.findOne({
      where: {
        basketId: basketId,
        productId
      }
    })

    if (!orderItem) {
      return next(ApiError.badRequest('Товары не найдены'))
    }

    return res.json(orderItem)

  }

  async increaseCartOrdersItem(req, res, next) {
    const {
      basketId,
      productId,
      sizeId
    } = req.body

    const productChar = await ProductChars.findOne({
      where: {
        productId,
        sizeId
      },

    })

    console.log(productChar);

    const orderItem = await BasketProduct.findOne({
      where: {
        basketId: basketId,
        productCharId: productChar.id
      }
    })

    if (orderItem) {
      orderItem.quantity += 1;
      await orderItem.save()
    } else {
      await BasketProduct.create({
        basketId,
        productCharId: productChar.id,
        quantity: 1
      });
    }
    const cartItem = await BasketProduct.findOne({
      where: {
        basketId: basketId,
        productCharId: productChar.id
      }
    })

    if (!cartItem) {
      return next(ApiError.badRequest('Товар не найдены'))
    }

    return res.json({
      cartItem
    })

  }

  async decreaseCartOrdersItem(req, res, next) {
    const {
      basketId,
      productId
    } = req.body

    const orderItem = await BasketProduct.findOne({
      where: {
        basketId: basketId,
        productId
      }
    })

    if (orderItem) {
      if (orderItem.quantity > 1) {
        orderItem.quantity -= 1;
        await orderItem.save()
      } else {
        const item = await BasketProduct.findOne({
          where: {
            basketId: basketId,
            productId
          }
        })
        item.destroy()
      }
    }

    const cartItem = await BasketProduct.findOne({
      where: {
        basketId: basketId,
        productId
      }
    })

    if (!cartItem) {
      return next(ApiError.badRequest('Товар не найдены'))
    }

    return res.json(cartItem)
  }

  async deleteCartOrdersItems(req, res, next) {
    const {
      basketId,
      productId
    } = req.query

    const orderItem = await BasketProduct.findOne({
      where: {
        basketId: basketId,
        productId
      }
    })

    if (!orderItem) {
      return next(ApiError.badRequest('Товар не найдены'))
    }

    const deleteItem = await orderItem.destroy()

    return res.json(deleteItem)

  }

  async clearBasket(req, res, next) {
    const {
      basketId
    } = req.query

    const items = await BasketProduct.findAll({
      where: {
        basketId: basketId
      }
    })

    if (!items) {
      return next(ApiError.badRequest('Товары не найдены'))
    }

    items.forEach((item) => item.destroy())

    return res.json(items)

  }

}

module.exports = new CartOrderController()