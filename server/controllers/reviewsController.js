const ApiError = require('../error/ApiError');
const { Review, Order, OrderProduct, Product, ProductChars } = require('../models/models');


class ReviewsController {

  async getAll(req, res, next) {
    try {
      let {productId, userId} = req.query;

      const reviews = await Review.findAll({where: {productId}});
      
      console.log(reviews);
      // console.log(productId, userId);
      
      const order = await OrderProduct.findOne({
        include: [
          {
            model: Order,
            where: {userId, status: 'Получен'}
          },
          {
            model: ProductChars,
            where: {productId: productId}

          }
        ]
      });

      const userReview = reviews.find(reviews => reviews.userId === userId);
      
      console.log('userCooment: ', userReview);
      
      if(!order) {
        console.log('order', order);
        
      }
      
      return res.json({
        reviews: reviews, 
        currentUserReview: userReview ? userReview : null,
        isPaid: order ? true : false
      })

      // if(!reviews) {
      //   next(ApiError.badRequest('Не удалось получить отзывы'))
      // }

      // const personalReview = reviews.find(reviews => reviews.userId === userId);

      // console.log(personalReview);
      
    } catch (error) {
      return ApiError.badRequest('Ошибка запроса');
    }
  }
}


module.exports = new ReviewsController();