const uuid = require('uuid')
const path = require('path');
const {
Brand,
Size,
Type,
Gender,
Color
} = require('../models/models')
const ApiError = require('../error/ApiError');

class FiltersController {

  async getAllFilters(req, res, next) {
    try {

      const sizes = await Size.findAll();
      const types = await Type.findAll();
      const colors = await Color.findAll();
      const genders = await Gender.findAll();

      return res.json([
        { title: 'Colors', data: colors },
        { title: 'Sizes', data: sizes },
        { title: 'Types', data: types },
        { title: 'Genders', data: genders }
      ]);
    } catch (error) {
      return next(ApiError.internal(error.message))
    }
  }


}

module.exports = new FiltersController()