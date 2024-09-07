const ApiError = require('../error/ApiError');
const { Review, Order, OrderProduct, Product, ProductChars, User } = require('../models/models');


class ReviewsController {

  async getAll(req, res, next) {
    try {
      let {productId, userId} = req.query;

      console.log(productId, userId);
      

      const reviews = await Review.findAll({
        where: {productId},
        include: [
          {model: User}
        ]
      });
      
      console.log('reviews: ', ...reviews);
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

      const userReview = reviews.find(review => review.userId === Number(userId))
      const reviewsWithoutCurrentUser = reviews.filter(review => review.userId!== Number(userId));
      
      
      if(!order) {
        console.log('order', order);
        
      }
      
      return res.json({
        reviews: reviewsWithoutCurrentUser, 
        currentUserReview: userReview ? userReview : null,
        isPaid: order ? true : false
      })

    } catch (error) {
      return ApiError.badRequest('Ошибка запроса');
    }
  }

  async createReview(req, res, next) {
    let {productId, userId, comment, rating} = req.body
    
    try {
      
      const review = await Review.create({
        productId,
        userId,
        comment,
        rating
      });
      
      return res.json(review);


    } catch (error) {
      return ApiError.badRequest('Ошибка запроса');
      
    }
  
  }
}


module.exports = new ReviewsController();